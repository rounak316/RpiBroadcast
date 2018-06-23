var firebase = require("firebase");

var config = {
  apiKey: "AIzaSyB2Ou2wJbIenKWNuZkbrmMMmof3IVv83sY",
  authDomain: "api-project-930527097734.firebaseapp.com",
  databaseURL: "https://api-project-930527097734.firebaseio.com",
  projectId: "api-project-930527097734",
  storageBucket: "api-project-930527097734.appspot.com",
  messagingSenderId: "930527097734"
};
  
 firebase.initializeApp(config);

var defaultDatabase = firebase.database();
let cnt=0
defaultDatabase.ref('rpi').on('child_changed', (data)=>{
      console.log('data', ++cnt)
  })