/* 
Created & Implemented by: Venkata Chakradhar Reddy Challa
Description: Contains controller logic for login view
*/ 
$("#fp").hide();


var login = {
    toggleTab: function (tab) {
          $("#login_error_info").empty();
            if(tab=="signIn"){
                $("#signupbox").hide();
                $("#signinbox").show();
                $("#fp").hide();
               } else {
                $("#signinbox").hide();
                $("#signupbox").show();
               }
        },
    toggle: function(tab1){
        if(tab1=="signIn")
            {
                $("#login_page").show();
                $("#fp").hide();
            }
        else{
            $("#login_page").hide();
            $("#fp").show();
        }
    },
 

    signIn: function () {
          $("#login_error_info").empty();
            var userName = $("#in_user_name").val();
            var userPwd = $("#in_user_pwd").val();
            var user = new User(userName, "", userPwd);
            if(userName && userPwd){
               loginService.getUser(user)
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
                  
    },
    

   forgotPassword: function(){
        $("#login_error_info").empty(); 
        var userName = $("#fp_user_name").val();
        var userEmail = $("#fp_user_email").val();
        var userNewPwd = $("#fp_user_pwd").val();
        var user = new User(userName, userEmail, userNewPwd);
        if(userName && userEmail && userNewPwd){
               loginService.getUser(user)
                        .then(function (res) {
                                if(res){
                                    if(res.email == user.email) {
                                        loginService.updateUser(user)
                                            .then(function (res) {
                                                console.log("Password Reset Successful");
                                                app.initiateARWorld();
                                            })
                                            .catch(function (err) {
                                                
                                            });
                                        
                                    } else {
                                        console.error("Please Enter a valid Email.");
                                    }
                                }
                          })
                          .catch(function (err) {
                        
                          });
                              
        }
    },

    guestSignIn: function () {
            app.initiateARWorld();
            window.user="Guest";
    }
}

