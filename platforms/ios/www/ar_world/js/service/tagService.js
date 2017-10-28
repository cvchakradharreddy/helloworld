/* 
Created & Implemented by: Venkata Chakradhar Reddy Challa
Description: Service to push/pull tag information to/from database
*/ 

var tagService = (function (){
    
    var tag_db = DB_MAIN;
    
    return {
        getAllTags: function() {
            var promise = new Promise(function(resolve, reject){
                databaseService.getAllDocuments(tag_db)
                .then(function(docs){
                    for(var i=0; i<docs.total_rows; i++){
                         databaseService.getDocument(tag_db, docs.rows[i].id)
                        .then(function(doc){
                            var poiData = new POIData(doc._id, doc.title, doc.description, doc.location);
                            return resolve(poiData);
                        })
                        .catch(function(err){
                             console.log("Fetching doc id "+docs.rows[i].id+" failed with error: "+err);
                             return reject(err);
                         });
                    }
                })
                .catch(function(err){
                    return reject(err);
                });
            });
            return promise;
        },
        postTag: function(/* object */ tag) {
             var promise = new Promise(function(resolve, reject){
                databaseService.createDocument(tag_db, tag)
                        .then(function(res) {
                            var newPOI = new POIData(res.id, tag.title, tag.description, tag.location);
                            return resolve(newPOI);
                        })
                        .catch(function(err){
                            console.log(err);
                        });

            });
            return promise;
        }
    }
})();