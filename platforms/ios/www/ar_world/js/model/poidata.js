/* 
Created & Implemented by: Venkata Chakradhar Reddy Challa
Description: Holds POI information 
*/

function POIData(id, title, desc, location) {
        this.id = id;
        this.title = title;
        this.description = desc;
        this.latitude = location ? parseFloat(location.latitude): 0;
        this.longitude = location ? parseFloat(location.longitude): 0;
        this.altitude = AR.CONST.UNKNOWN_ALTITUDE;
    }