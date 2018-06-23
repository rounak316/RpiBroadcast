
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



function ingestDatatoFirebase(){
  
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
     data['publicIp'] = ip 
     return data

 }).catch(err=>{

    data['publicIp'] = '0.0.0.0'
    return data

 })
 .then( data =>{
  rpi.set(data, (a)=> {
console.log('callback ? ', a)
return setTimeout(ingestDatatoFirebase , timeOut)
  } )
  
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
  // console.log('Something went Wrong..Trying again', err)
  setTimeout(ingestDatatoFirebase , timeOut)
}
}



ingestDatatoFirebase()