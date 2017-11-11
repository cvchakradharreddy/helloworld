/* 
Created & Implemented by: Venkata Chakradhar Reddy Challa
Description: End point that push/pull records to/from database
*/ 

var databaseService = (function (){
    
    var client;
    
    function initRestClient() {
        var promise = new Promise(function(resolve, reject){
            var initClient =  new SwaggerClient({
            spec: window.spec,
            usePromise: true,
            })
            .then(function(client){
                resolve(client);
            })
            .catch(function (err) {
                reject(err);
            });
        });
        return promise;
    };
    
    function getClient(mode) {
        var promise = new Promise(function(resolve, reject){
            if(!client) {
                initRestClient()
                    .then(function(sclient) {
                        client = sclient;
                        window.sclient = sclient; //dev purpose
                        setClientHost(mode, client);
                        resolve(client);
                    })
                    .catch(function (err) {
                        console.log(err);
                        reject(err);
                    });
            } else {
                setClientHost(mode, client);
                resolve(client);
            }
        });
        return promise;
    };
    
    function setClientHost(mode, client) {
        if(client) {
           if(mode == "admin") {
                client.setHost(SYNC_GATEWAY_HOST_ADMIN);
            } else {
                client.setHost(SYNC_GATEWAY_HOST);
            }
        }
    };

    return {
        getAdminClient: function() {
            var promise = new Promise(function(resolve, reject){
                getClient("admin")
                    .then(function(client){
                        resolve(client);
                    })
                    .catch(function(err) {
                        reject(err);
                    });
            });
            return promise;
        },
        getClient: function() {
            var promise = new Promise(function(resolve, reject){
                getClient()
                    .then(function(client){
                        resolve(client);
                    })
                    .catch(function(err) {
                        reject(err);
                    });
            });
            return promise;
        },
        getAdminServer: function() {
            var promise = new Promise(function(resolve, reject){
                databaseService.getAdminClient()
                    .then(function(client){
                        resolve(client.server);
                    })
                    .catch(function(err) {
                        reject(err);
                    });
            });
            return promise;
        },
        getServer: function() {
            var promise = new Promise(function(resolve, reject){
                databaseService.getClient()
                    .then(function(client){
                        resolve(client.server);
                    })
                    .catch(function(err) {
                        reject(err);
                    });
            });
            return promise;
        },
        getAllDatabases: function() {
            var promise = new Promise(function(resolve, reject){
                databaseService.getAdminServer()
                    .then(function(server){
                       server.get_all_dbs()
                        .then(function (res) {
                            return resolve(res.obj);
                        })
                        .catch(function (err) {
                           return reject(err);
                        });
                    })
                    .catch(function(err) {
                        return reject(err);
                    });
            });
             return promise;
        },
        createDatabase: function(db_name) {
            var promise = new Promise(function(resolve, reject){
                databaseService.getClient()
                    .then(function(client){
                       client.database.put_db({db: db_name})
                        .then(function (res) {
                            return resolve(res.obj);
                        })
                        .catch(function (err) {
                           return reject(err);
                        });
                    })
                    .catch(function(err) {
                        return reject(err);
                    });
            });
             return promise;
        },
        getDatabase: function(db_name) {
            var promise = new Promise(function(resolve, reject){
                databaseService.getClient()
                    .then(function(client){
                       client.database.get_db({db: db_name})
                        .then(function (res) {
                            return resolve(res.obj);
                        })
                        .catch(function (err) {
                           return reject(err);
                        });
                    })
                    .catch(function(err) {
                        return reject(err);
                    });
            });
             return promise;
        },
        createDocument: function(db_name, doc, doc_id) {
            if(doc_id) {
               doc["_id"] = doc_id;
               }
            var promise = new Promise(function(resolve, reject){
                databaseService.getClient()
                    .then(function(client){
                      client.document.post({db: db_name, body: doc})
                        .then(function (res) {
                            return resolve(res.obj);
                        })
                        .catch(function (err) {
                           return reject(err);
                        });
                    })
                    .catch(function(err) {
                        return reject(err);
                    });
            });
            return promise;
        },
        getDocument: function(db_name, doc_id) {
            var promise = new Promise(function(resolve, reject){
                databaseService.getClient()
                    .then(function(client){
                      client.document.get({db: db_name, doc: doc_id})
                        .then(function (res) {
                            return resolve(res.obj);
                        })
                        .catch(function (err) {
                           return reject(err);
                        });
                    })
                    .catch(function(err) {
                        return reject(err);
                    });
            });
            return promise;
        },
        getAllDocuments: function(db_name) {
            var promise = new Promise(function(resolve, reject){
                databaseService.getClient()
                    .then(function(client){
                      client.database.get_db_all_docs({db: db_name})
                        .then(function (res) {
                            return resolve(res.obj);
                        })
                        .catch(function (err) {
                           return reject(err);
                        });
                    })
                    .catch(function(err) {
                        return reject(err);
                    });
            });
            return promise;
        },
        updateDocument: function(db_name, doc, doc_id) {
            if(doc_id) {
               doc["_id"] = doc_id;
               }
            var promise = new Promise(function(resolve, reject){
                databaseService.getClient()
                    .then(function(client){
                      client.document.put({db: db_name, doc: doc_id, body: doc})
                        .then(function (res) {
                            return resolve(res.obj);
                        })
                        .catch(function (err) {
                           return reject(err);
                        });
                    })
                    .catch(function(err) {
                        return reject(err);
                    });
            });
            return promise;
        },
    }
})();