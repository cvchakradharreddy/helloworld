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

