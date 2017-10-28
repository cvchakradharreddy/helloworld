/* 
Created & Implemented by: Venkata Chakradhar Reddy Challa
Description: Contains logic to launch application and to initiate AR world 
*/ 

var app = {
    isARWorldLoaded: false,
    ARWorld_config:  {
            "path": "www/ar_world/view/main.html",
            "requiredFeatures": [
                "geo"
            ],
            "startupConfiguration": {
                "camera_position": "back",
                "camera_resolution": "auto"
            }
    },
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.connectDB(DB_USER);
        this.receivedEvent('deviceready');
    },
    
    
    connectDB: function(db_name) {
      if (window.cblite) {
          window.cblite.getURL(function (err, url) {
            if (err) {
                console.log("error launching Couchbase Lite: " + err)
            } else {
                console.log("Couchbase Lite running at " + url);
                databaseService.getAllDatabases()
                    .then(function(dbs){
                        if (dbs.indexOf(db_name) == -1) {
                            databaseService.createDatabase(db_name)     .then(function(res){
                                    console.log("Database " + res.db_name +" created");
                                })
                                .catch(function(err){
                                    console.log("Database "+db_name+" creation failed with error: "+err);
                                 $("#database_status").html("Database "+db_name+" fetch failed with error: "+err);
                                });
                               console.log("Database " + url);
                        } else {
                            databaseService.getDatabase(db_name)
                                .then(function(res){
                                    console.log("Database " + res.db_name +" is available");
                                    $("#database_status").html("Database " + res.db_name +" is available");
                                })
                                .catch(function(err){
                                    console.log("Database "+db_name+" fetch failed with error: "+err);
                                     $("#database_status").html("Database "+db_name+" fetch failed with error: "+err);
                                 });
                        }
                    }) 
                    .catch(function (err) {
                   console.log(err);
                    $("#database_status").html("Database "+db_name+" fetch failed with error: "+err);
                });
            }
        });
      } else {
          console.log("error, Couchbase Lite plugin not found.");
      }  
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');
        
        app.wikitudePlugin = cordova.require("com.wikitude.phonegap.WikitudePlugin.WikitudePlugin");
        app.wikitudePlugin.setJSONObjectReceivedCallback(app.onJSONObjectReceived);

        console.log('Received Event: ' + id);
    },
    initiateARWorld: function() {
        console.log("*** Initiating AR World ***");        
        app.wikitudePlugin.isDeviceSupported(app.onDeviceSupported, app.onDeviceNotSupported, app.ARWorld_config.requiredFeatures);      
        
    },
    onDeviceSupported: function() {
        app.prepareARWorld();
    },
    onDeviceNotSupported: function() {
        console.error("Device not supported for AR");
        alert("Device not supported for AR");
    },
    prepareARWorld: function() {
        app.wikitudePlugin.requestAccess(
                function() {
                   app.loadARWorld();
                },
                function(error) {
                    /* The error object contains two error messages.
                        * userDescription is a end user formatted message that can be displayed with e.g. a JS alert
                        * developerDescription is a developer formatted message with more detailed information about the error
                     */
                    /* Here, the userDescription is used to show a confirmation box which, in case of a positive result, shows the applications settings so that user can grant access. */
                    var openAppSettings = confirm(error.userDescription + '\nOpen App Settings?');
                    if ( openAppSettings == true ) {
                        app.wikitudePlugin.openAppSettings();
                    }
                },
                app.ARWorld_config.requiredFeatures);
    },
    loadARWorld: function() {
        app.wikitudePlugin.loadARchitectWorld(function successFn(loadedURL) {
                /* Respond to successful world loading if you need to */
                app.isARWorldLoaded = true;
            }, function errorFn(error) {
                app.isARWorldLoaded = false;
                alert('Loading AR web view failed: ' + error);
            },
            app.ARWorld_config.path, app.ARWorld_config.requiredFeatures, app.ARWorld_config.startupConfiguration
        );

    },
    // This function gets called if you call "AR.platform.sendJSONObject" in your ARchitect World
    onJSONObjectReceived: function (jsonObject) {
        if (typeof jsonObject.action !== 'undefined') {
            if ( jsonObject.action === "capture_screen" ) {
                app.wikitudePlugin.captureScreen(
                    function(absoluteFilePath) {
                        alert("snapshot stored at:\n" + absoluteFilePath);
                    },
                    function (errorMessage) {
                        alert(errorMessage);
                    },
                    true, null
                );
            } else if (jsonObject.action === "present_poi_details") {
                var alertMessage = "Poi '" + jsonObject.id + "' selected\nTitle: " + jsonObject.title + "\nDescription: " + jsonObject.description;
                alert(alertMessage);
            }
        }
    }   
};
app.initialize();
