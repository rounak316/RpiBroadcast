
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

function insertData(data){

  return admin.firestore().doc("Home/Rpi" ).set(data)
}




function ingestDatatoFirebase(){
  
try{


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
return insertData(data)  
 })
 .then( () =>{
   console.log('success' )
  return setTimeout(ingestDatatoFirebase , timeOut)
   })
 .catch((err)=>{
  console.log('catch' , err)
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