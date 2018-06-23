const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });


exports.helloWorld = functions.https.onRequest((request, response) => {
    // admin.database().ref('/lastmodified').set("Bitch")
    response.send("lastmodified!", "Bitch");
   });

// exports.touch = functions.database.ref('/rpi').onWrite(
// (change, context) => admin.database().ref('/lastmodified').set(context.timestamp));

// functions.database.ref("rpi").onWrite( ()=>{
//     console.log('Write Triggered')
// }  )
