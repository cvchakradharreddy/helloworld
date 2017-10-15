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
Qunit.test("Signin", function(){
   var s= $("#in_user_name").val("am15am");
    $("#in_user_pwd").val("am14am");
    $("#insign").onclick;
    
    
});