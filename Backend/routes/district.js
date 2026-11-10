
var express = require('express'); 
var router = express.Router(); 
var mysql = require('mysql'); 
var con = mysql.createConnection({ 
host: "localhost", 
user: "root", 
password: "", 
database: "agriconnectkerala" 
}); 
/* GET users listing. */ 
router.post('/',function (req, res, next){ 
let districtname = req.body.DistrictName; 

 
let query = `SELECT * FROM tbldistrict where districtname='${districtname}';`; 
console.log(query)
con.query(query, (err, rows) => { 
if (err) throw err; 
if (rows == "") { 
let strquery = `INSERT INTO tbldistrict (districtname) VALUES(?);`; 
console.log(strquery,[districtname])
con.query(strquery, [districtname]) 
res.send({ message: 'Success' }) 
} 
 
else { 
res.send({ message: 'Failed' }) 
} 
// console.log("1 record inserted"); 
}); 
}); 
module.exports = router;
