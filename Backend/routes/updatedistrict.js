var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "agriconnectkerala"
});
router.post('/', (req, res, next) => {
    let districtid = req.body.districtid;
    let districtname = req.body.DistrictName;
    
    let strquery = `UPDATE tbldistrict SET districtname='${districtname}' where districtid='${districtid}'`;
    console.log(strquery)
    con.query(strquery, (err, rows) => {
    if (err) throw err;
    res.send({message:'Success'})
    });
    })  
module.exports = router;
