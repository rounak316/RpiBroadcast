
let admin = require('firebase-admin');
let serviceAccount = require('./key.json');
let interface = require('./interface')

const publicIp = require('public-ip');

let timeOut = 1000
let timeDelta = 1000

console.log('app initializeing')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://api-project-930527097734.firebaseio.com"
});
console.log('app initialized')



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
 return publicIp.v4().then(ip=>{
  data['publicIp'] = ip
  rpi.set(data)

  setTimeout(ingestDatatoFirebase , timeOut)


 }).catch(err=>{

   data['publicIp'] = '0.0.0.0'
  rpi.set(data)
  setTimeout(ingestDatatoFirebase , timeOut)
 })
} )
.catch(err=>{

  setTimeout(ingestDatatoFirebase , timeOut)
})

 
}
catch(err){
  console.log('Something went Wrong..Trying again')
  setTimeout(ingestDatatoFirebase , 1000)
}
}



ingestDatatoFirebase()