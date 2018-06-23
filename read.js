
let admin = require('firebase-admin');
let serviceAccount = require('./key.json');
let interface = require('./interface')

const publicIp = require('public-ip');


let timeOut = 1000
let timeDelta = 1000



  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://api-project-930527097734.firebaseio.com"
  });



  let db = admin.database();
let cnt =0
  let rpi = db.ref('rpi').on('child_changed', (data)=>{
      console.log('data', ++cnt)
  })