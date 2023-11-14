var admin = require("firebase-admin");

var serviceAccount = require("./festa-on-firebase-adminsdk.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
},"back-end");


exports.admin = admin