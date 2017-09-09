cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "id": "com.wikitude.phonegap.WikitudePlugin.WikitudePlugin",
        "file": "plugins/com.wikitude.phonegap.WikitudePlugin/www/WikitudePlugin.js",
        "pluginId": "com.wikitude.phonegap.WikitudePlugin",
        "clobbers": [
            "WikitudePlugin"
        ]
    },
    {
        "id": "com.couchbase.lite.phonegap.CouchbaseLite",
        "file": "plugins/com.couchbase.lite.phonegap/www/cblite.js",
        "pluginId": "com.couchbase.lite.phonegap",
        "clobbers": [
            "window.cblite"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-whitelist": "1.3.2",
    "com.wikitude.phonegap.WikitudePlugin": "6.1.0",
    "com.couchbase.lite.phonegap": "1.4.0"
};
// BOTTOM OF METADATA
});