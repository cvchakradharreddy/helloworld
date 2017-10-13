var login = {
    toggleTab: function (tab) {
            if(tab=="signIn"){
                $("#signupbox").hide();
                $("#signinbox").show();
               } else {
                $("#signinbox").hide();
                $("#signupbox").show();
               }
        },

    signIn: function () {
            var userName = $("#in_user_name").val();
            var userPwd = $("#in_user_pwd").val(); 
        },

    signUp: function () {
            var userName = $("#up_user_name").val();
            var userEmail = $("#up_user_email").val();
            var userPwd = $("#up_user_pwd").val(); 
        }
}