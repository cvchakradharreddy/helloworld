/* 
Created & Implemented by: Venkata Chakradhar Reddy Challa
Description: Service to pull/push user login/registration information to/from database
*/ 

var loginService = (function (){
    
    var login_db = DB_USER;
    
    return {
        signUpUser: function(/* object */ user) {
            var promise = new Promise(function(resolve, reject){
                databaseService.createDocument(login_db, user, user.username)
                    .then(function (res) {
                            return resolve(res);
                    })
                    .catch(function (err) {
                           return reject(err);
                    });
            });
            return promise;
        },
        getUser: function(/* object */ user) {
             var promise = new Promise(function(resolve, reject){
                databaseService.getDocument(login_db, user.username)
                    .then(function (res) {
                            return resolve(res);
                    })
                    .catch(function (err) {
                           return reject(err);
                    });
            });
            return promise;
        },
        updateUser: function(/* object */ user){
            var promise = new promise(function(resolve, reject){
            databaseService.updateDocument(login_db, user, user.username)
            .then(function (res){
                    return resolve(res);
             })
            .catch(function(err){
                    return reject(err);
            });
        });
        return promise;     
        },
    }
        
})();