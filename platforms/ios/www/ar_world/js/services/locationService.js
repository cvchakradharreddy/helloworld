var locationService = (function (){
    var loc;

    return {
        getLocation: function(){
            return loc ? loc : null; 
        },
        setLocation: function(lat, lon, alt, acc){
            if(loc){
                loc.latitude = lat;
                loc.longitude = lon;
                loc.altitude = alt;
                loc.acceleration = acc;
            }
            else {
                loc = new Location(lat, lon, alt, acc)
            }
        },
        getLatitude: function(){
            if(loc){
               return loc.latitude; 
            }
            return null; 
        },
        getLongitude: function() {
            if(loc){
               return loc.longitude; 
            }
            return null;  
        },
        getAltitude: function(){
            if(loc){
               return loc.altitude; 
            }
            return null; 
        },
        getAcceleration: function(){
            if(loc){
               return loc.acceleration; 
            }
            return null; 
        },
        setLatitude: function(value){
            if(loc){
               loc.latitude = value; 
            }    
        },
        setLongitude: function(value) {
            if(loc){
               loc.longitude = value; 
            }  
        },
        setAltitude: function(value){
            if(loc){
               loc.altitude = value; 
            }
        },
        setAcceleration: function(value){
            if(loc){
               loc.acceleration = value; 
            }
        }
    }
})();