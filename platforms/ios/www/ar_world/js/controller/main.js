/* 
Created & Implemented by: Venkata Chakradhar Reddy Challa
Description: Contains controller logic for main AR world view
*/ 

// implementation of AR-Experience (aka "arworld")
console.log("*** AR World Loaded ***");
var arworld = {
	// you may request new data from server periodically, however: in this sample data is only requested once
	isRequestingData: false,

	// true once data was fetched
    requestedData: false,
	initiallyLoadedData: false,

	// different POI-Marker assets
	markerDrawable_idle: null,
	markerDrawable_selected: null,
	markerDrawable_directionIndicator: null,

	// list of AR.GeoObjects that are currently shown in the scene / arworld
	markerList: [],

	// The last selected marker
	currentMarker: null,

    loadMarkerDefaultAssets: function() {
        console.log("***loadMarkerDefaultAssets****");
        // Start loading marker assets:
		// Create an AR.ImageResource for the marker idle-image
		arworld.markerDrawable_idle = new AR.ImageResource("../../assets/marker_idle.png");
		// Create an AR.ImageResource for the marker selected-image
		arworld.markerDrawable_selected = new AR.ImageResource("../../assets/marker_selected.png");
		// Create an AR.ImageResource referencing the image that should be displayed for a direction indicator. 
		arworld.markerDrawable_directionIndicator = new AR.ImageResource("../../assets/indi.png");
    },
	// called to inject new POI data
	loadPoisFromData: function loadPoisFromDataFn(poiData) {

		// loop through POI-information and create an AR.GeoObject (=Marker) per POI
		/*for (var currentPlaceNr = 0; currentPlaceNr < poiData.length; currentPlaceNr++) {
			var singlePoi = {
				"id": poiData[currentPlaceNr].id,
				"latitude": parseFloat(poiData[currentPlaceNr].latitude),
				"longitude": parseFloat(poiData[currentPlaceNr].longitude),
				"altitude": parseFloat(poiData[currentPlaceNr].altitude),
				"title": poiData[currentPlaceNr].name,
				"description": poiData[currentPlaceNr].description
			}; */

			/*
				To be able to deselect a marker while the user taps on the empty screen, 
				the arworld object holds an array that contains each marker.
			*/
            var marker = new Marker(poiData);
			arworld.markerList.push(marker);
            console.log("Loaded POI title: "+poiData.title+" Data: "+poiData);
		//arworld.updateStatusMessage(currentPlaceNr + ' places loaded');
	},

	// updates status message shown in small "i"-button aligned bottom center
	updateStatusMessage: function updateStatusMessageFn(message, isWarning) {

		var themeToUse = isWarning ? "e" : "c";
		var iconToUse = isWarning ? "alert" : "info";

		$("#status-message").html(message);
		$("#popupInfoButton").buttonMarkup({
			theme: themeToUse
		});
		$("#popupInfoButton").buttonMarkup({
			icon: iconToUse
		});
	},

	// location updates, fired every time you call architectView.setLocation() in native environment
	locationChanged: function locationChangedFn(lat, lon, alt, acc) {
        locationService.setLocation(lat, lon, alt, acc);
        /*console.log("Location--> lat:"+lat+" long:"+lon+" alt:"+alt+ " acc:"+acc); */
		/*
			The custom function arworld.onLocationChanged checks with the flag arworld.initiallyLoadedData if the function was already called. With the first call of arworld.onLocationChanged an object that contains geo information will be created which will be later used to create a marker using the arworld.loadPoisFromJsonData function.
		*/
		if (!arworld.requestedData) {
            console.log("Request data from database");
            // empty list of visible markers
		    arworld.markerList = [];
            arworld.loadMarkerDefaultAssets();
			/* 
				requestDataFromLocal with the geo information as parameters (latitude, longitude) creates different poi data to a random location in the user's vicinity.
			*/
			arworld.requestDataFromDatabase(lat, lon);
			
		}
       arworld.requestedData = true;
	},

	// fired when user pressed maker in cam
	onMarkerSelected: function onMarkerSelectedFn(marker) {

		// deselect previous marker
		if (arworld.currentMarker) {
			if (arworld.currentMarker.poiData.id == marker.poiData.id) {
				return;
			}
			arworld.currentMarker.setDeselected(arworld.currentMarker);
		}

		// highlight current one
		marker.setSelected(marker);
		arworld.currentMarker = marker;
	},

	// screen was clicked but no geo-object was hit
	onScreenClick: function onScreenClickFn() {
		if (arworld.currentMarker) {
			arworld.currentMarker.setDeselected(arworld.currentMarker);
		}
	},

	// request POI data
	requestDataFromDatabase: function requestDataFromDatabseFn(centerPointLatitude, centerPointLongitude) {

            tagService.getAllTags()
                .then(function(poiData){
                            arworld.loadPoisFromData(poiData);
                        })
                        .catch(function(err){
                             console.log("Fetching All tags from database failed with error: "+err);
                         });

            /*for (var i = 0; i < poisToCreate; i++) {
                poiData.push({
                    "id": (i + 1),
                    "longitude": (centerPointLongitude + (Math.random() / 5 - 0.1)),
                    "latitude": (centerPointLatitude + (Math.random() / 5 - 0.1)),
                    "description": ("This is the description of POI#" + (i + 1)),
                    // use this value to ignore altitude information in general - marker will always be on user-level
                    "altitude": AR.CONST.UNKNOWN_ALTITUDE,
                    "name": ("POI#" + (i + 1))
                });
            } */
	},
    
    getCurrentLocation: function() {
        return locationService.getLocation();
    },
    
    postPOIinfo: function() {
        var title = $("#title").val();
        var desc = $("#desc").val();
        $( "#popupPOIInfo" ).popup( "close" );
        console.log("*** Posting POI information ***");
        var tag = new Document(arworld.getCurrentLocation(), title, desc);
        if(window.user=="Guest"){
            var newPOI = new POIData("1234", tag.title, tag.description, tag.location);
            arworld.loadPoisFromData(newPOI);
        } else {
            tagService.postTag(tag)
            .then(function(res) {
               arworld.loadPoisFromData(res);
            })
            .catch(function(err){
                console.log(err);
            });
        }
        //arworld.createCustomPOI(title, desc);
    },
    
    createCustomPOI: function(title, desc) {
      /*location = arworld.getCurrentLocation();
      //var  location = {latitude: 12, longitude: 13, altitude: 14}
        if(location) {
            var customPoi = {
				"id": title,
				"latitude": parseFloat(location.latitude),
				"longitude": parseFloat(location.longitude),
				"altitude": parseFloat(location.altitude),
				"title": title,
				"description": desc
			};
            arworld.markerList.push(new Marker(customPoi));
   
        } else {
            console.error("*** Current Location is not found ***");
        } */
    }

};

/* 
	Set a custom function where location changes are forwarded to. There is also a possibility to set AR.context.onLocationChanged to null. In this case the function will not be called anymore and no further location updates will be received. 
*/
AR.context.onLocationChanged = arworld.locationChanged;

/*
	To detect clicks where no drawable was hit set a custom function on AR.context.onScreenClick where the currently selected marker is deselected.
*/
AR.context.onScreenClick = arworld.onScreenClick;