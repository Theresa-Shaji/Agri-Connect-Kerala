module.exports = router; 
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
let district = req.body.districtid; 
let location = req.body.LocationName; 
 
let query = `SELECT * FROM tbllocation where locationname='${location}';`; 
con.query(query, (err, rows) => { 
if (err) throw err; 
if (rows == "") { 
let strquery = `INSERT INTO tbllocation (locationname,districtid)VALUES(?,?);`; 
con.query(strquery, [location,district]) 
res.send({ message: 'Success' }) 
} 
 
else { 
res.send({ message: 'Failed' }) 
} 
// console.log("1 record inserted"); 
}); 
}); 
module.exports = router;