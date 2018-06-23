
let admin = require('firebase-admin');
let serviceAccount = require('./key.json');
let interface = require('./interface')

const publicIp = require('public-ip');

let timeOut = 1000
let timeDelta = 1000

if(admin.apps.length == 0){

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://api-project-930527097734.firebaseio.com"
  });
}


function ingestDatatoFirebase(){
  console.log('admin.apps.length')
try{



let db = admin.database();
let ref = db.ref("/some_resource");
let rpi = db.ref('rpi')


interface.getData().then(data=>{
  let time = Date.now()
  data['timestamp'] = time
  data['timelapse'] = timeOut + timeDelta
  return data
})
.then( (data)=>{
  publicIp.v4().then(ip=>{
    return data['publicIp'] = ip 

 }).catch(err=>{

  return  data['publicIp'] = '0.0.0.0'

 })
 .then( data =>{
  rpi.set(data)
  return setTimeout(ingestDatatoFirebase , timeOut)
 })
 .catch((err)=>{
  return setTimeout(ingestDatatoFirebase , timeOut)
 })
} )
.catch(err=>{

  return  setTimeout(ingestDatatoFirebase , timeOut)
})

 
}
catch(err){
  console.log('Something went Wrong..Trying again', err)
  setTimeout(ingestDatatoFirebase , 1000)
}
}



ingestDatatoFirebase()