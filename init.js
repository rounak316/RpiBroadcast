
let admin = require('firebase-admin');
let serviceAccount = require('./key.json');
let interface = require('./interface')

let timeOut = 1000
let timeDelta = 1000
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://api-project-930527097734.firebaseio.com"
});

let db = admin.database();
let ref = db.ref("/some_resource");


function ingestDatatoFirebase(){

let rpi = db.ref('rpi')
interface.getData().then(data=>{
  let time = Date.now()
  data['timestamp'] = time
  data['timelapse'] = timeOut + timeDelta
  rpi.set(data)
  setTimeout(ingestDatatoFirebase , timeOut)

}).catch(err=>{

  setTimeout(ingestDatatoFirebase , timeOut)
})

}



ingestDatatoFirebase()