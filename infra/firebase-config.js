
var admin = require("firebase-admin");

var serviceAccount = require("./festa-on-firebase-adminsdk-1rizw-d233aa0752.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = admin