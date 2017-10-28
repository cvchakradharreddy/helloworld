/* 
Created & Implemented by: Venkata Chakradhar Reddy Challa
Description: Contains controller logic for login view
*/ 

var login = {
    toggleTab: function (tab) {
          $("#login_error_info").empty();
            if(tab=="signIn"){
                $("#signupbox").hide();
                $("#signinbox").show();
               } else {
                $("#signinbox").hide();
                $("#signupbox").show();
               }
        },

    signIn: function () {
          $("#login_error_info").empty();
            var userName = $("#in_user_name").val();
            var userPwd = $("#in_user_pwd").val();
            var user = new User(userName, "", userPwd);
            if(userName && userPwd){
               loginService.signInUser(user)
                        .then(function (res) {
                                if(res){
                                    if(res.password == user.password) {
                                        console.log("User: "+user.username+" signIn successful");
                                        app.initiateARWorld();
                                       } else {
                                        console.error("Incorrect Password! Try again.");
                                        $("#login_error_info").html("Incorrect Password! Try again.");
                                       }
                                   } else {
                                        console.error("User: "+user.username+" signIn has issues");
                                   }
                        })
                        .catch(function (err) {
                                console.error("User not found! Error: "+err.statusText);
                                $("#login_error_info").html("User not found!");
                        });
               }
        },

    signUp: function () {
            $("#login_error_info").empty(); 
            var userName = $("#up_user_name").val();
            var userEmail = $("#up_user_email").val();
            var userPwd = $("#up_user_pwd").val();
            var user = new User(userName, userEmail, userPwd);
            if(userName && userEmail && userPwd){               
                loginService.signUpUser(user)
                    .then(function (res) {
                        console.log("User: "+user.username+" signUp successful");
                        app.initiateARWorld();
                    })
                    .catch(function (err) {
                        if(err && err.obj.error == "conflict" && err.obj.reason == "Document exists"){
                            console.error("User: "+user.username+" already exists! Try another.");
                            $("#login_error_info").html("User: "+user.username+" already exists!</br>Try another.");
                        } else {
                            console.error("User signUp error: "+err);
                        }
                    });
            }                
                  
    }         
}

