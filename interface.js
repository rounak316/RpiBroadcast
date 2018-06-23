
var os = require('os');
var ifaces = os.networkInterfaces();



function getData(){
    
    return new Promise( (res,rej)=>{
        gatherData(res)
    } )
    
}
let interfaces = {}
function gatherData(callback){

interfaces = {}
Object.keys(ifaces).forEach(function (ifname, index, array) {
    if(index == array.length -1){

        callback(interfaces)
    }

    

    var alias = 0;
    
    ifaces[ifname].forEach(function (iface) {
      if ('IPv4' !== iface.family || iface.internal !== false) {
        // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses          
        return
      }
  
      if (alias >= 1) {
        // this single interface has multiple ipv4 addresses
        // console.log(ifname + ':' + alias, iface.address);
        
        interfaces[ ifname + ':' + alias]= iface.address
        
      } else {
        // this interface has only one ipv4 adress
        // console.log(ifname, iface.address);
        interfaces[ ifname ]= iface.address
      }
      ++alias;
   
    });
  });
}



module.exports.getData = getData