
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

  let GlobalData = {}

  function jsonEqual(a,b) {
    return JSON.stringify(a) === JSON.stringify(b);
}

function insertData(data){
if ( jsonEqual(data , GlobalData) ){
  console.log("Equal", data , GlobalData)
  return  Promise.resolve()
}
console.log('Unique', data , GlobalData)

GlobalData = JSON.parse(JSON.stringify(data))
let time = Date.now()
data['timestamp'] = time
  return admin.firestore().doc("Home/Rpi" ).set(data)
}




function ingestDatatoFirebase(){
  
try{


interface.getData().then(data=>{
  
  // data['timestamp'] = time
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