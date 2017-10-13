/* 
Login service that map UI to database for Signup and Signin user 
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
        signInUser: function(/* object */ user) {
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
        }
    }
})();