

function initRESTClient(url) {
  var client = new SwaggerClient({
    spec: window.spec,
    usePromise: true,
  })
    .then(function (client) {
      //client.setHost(url);
        client.setHost(SYNC_GATEWAY_HOST_ADMIN);
      /*if (device.platform == 'android') {
        var encodedCredentials = "Basic " + window.btoa(url.split('/')[1].split('@')[0]);
        client.clientAuthorizations.add("auth", new SwaggerClient.ApiKeyAuthorization('Authorization', encodedCredentials, 'header'));
      } */
        
      client.server.get_all_dbs()
        .then(function (res) {
              var dbs = res.obj;
              if (dbs.indexOf(DB_NAME) == -1) {
                return client.database.put_db({db: DB_NAME});
              }
              return client.database.get_db({db: DB_NAME});
        })
        .then(function (res) {
                return client.document.post({db: DB_NAME, body: {title: 'Couchbase Mobile', sdk: 'PhoneGap'}});
            }, function(err){
                console.log('Error fetching database: ' + err);
        })
        .then(function (res) {
            console.log('Document ID :: ' + res.obj.id);
        })
        .catch(function (err) {
            console.log(err);
        });
    });

}