/* 
Created by: Venkata Chakradhar Reddy Challa
Implemented by: Ashish Mekala
Description: Contains Units test code
*/ 

/* Example

QUnit.test( "Description of tests", function(assert) {
    assert.ok( true, "ok is for boolean tests" );
    assert.equal( 1, 1, "equal is for comparing two values" );
});
 // tell QUnit you're not ready to start right away...
            QUnit.config.autostart = false;

            $.ajax({
              url: '../www/index.html',
              dataType: 'html',
              success: function(html) {
                // find specific elements you want...
                var elem = $(html).find(.app);
                $('#qunit-fixture').append(elem);

                QUnit.start();  // ...tell QUnit you're ready to go
              }
            });  */


/**************************
Code reviewed by : Venkata Challa, 10/15/2017
Comments: 
1. Test cases are not meant to be written in actual application code (index.html/login.html), must be written in tests.js or test_index.html
2. Test cases are not implemented properly and need code changes. Full test coverage is not done.
****************************/

QUnit.test( "Sign in available", function(assert) {
    var signinTxt = $("#tabbox #signin").html();
    var notEmpty = (signinTxt != "");
    assert.ok( notEmpty, "Label is not empty" );
    assert.equal( "Sign In", signinTxt, "Label matched" );
});

QUnit.test("Sign up available", function(assert){
    var signupTxt=$("#tabbox #signup").html();
    var notEmpty=(signupTxt!="");
    assert.ok(notEmpty,"Label is not empty");
    assert.equal("Sign Up ", signupTxt,"Label matched");
           });

/*
Incorrect implementation 
*/

QUnit.test("email signup",function(assert){
    var check_email=/^[+a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
    assert.ok(check_email.test("ashish25@yahoo.com")=== true,"Valid Email");
   assert.ok(check_email.test("ashish_25@yahoo.com")=== true,"Valid Email"); 
    assert.ok(check_email.test("ashihs.com")===false,"Invalid Email");
    assert.ok(check_email.test("@gmail.com")===false,"Invalid Email");
});
QUnit.test("username",function(assert){
    var check_username=/^[a-z][a-z0-9]+$/;
    assert.ok(check_username.test("am15am")===true,"Valid Username");
    assert.ok(check_username.test("a15am")===true,"Valid Username");
    assert.ok(check_username.test("15am")===false,"Invalid Username");
});
QUnit.test("Password",function(assert){
    var check_pwd=/^([a-zA-Z0-9@*#_-]{8,15})$/;
    assert.ok(check_pwd.test("Ashish@345")===true,"Valid Password");
    assert.ok(check_pwd.test("Ashish_345")===true,"Valid Password");
    assert.ok(check_pwd.test("Ashish!345")===false,"InValid Password");
           
});

/*
Incomplete implementation 
*/
document.getElementById("in_user_name").value="am15am";
QUnit.test("Signin", function(){
   document.getElementById("in_user_name").value="am15am";
    $("#in_user_pwd").val("am14am");
    $("#insign").onclick;
    
    
});
QUnit.test("Signin", function(assert){
        $("#in_user_name").val("am15am");
        $("#in_user_pwd").val("am14am");
        $("#insign").onclick;
        });