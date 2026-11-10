var mysql = require('mysql'); 
var express = require('express'); 
var router = express.Router(); 
var con = mysql.createConnection({ 
host: "localhost", 
user: "root", 
password: "", 
database: "agriconnectkerala" 
}); 
router.post('/', (req, res, next) => { 
    let districtid = req.body.districtid; 
    let query = `DELETE FROM tbldistrict WHERE districtid='${districtid}';`; 
    con.query(query,(err,rows) => { 
        if (err) throw err; 
        res.send({message:'Success'} 
        ); 
    }); 
         
        }); 
    
        module.exports = router;