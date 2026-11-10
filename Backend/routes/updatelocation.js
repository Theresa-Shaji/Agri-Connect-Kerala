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
    let locationid = req.body.locationid;
    let locationname = req.body.LocationName;
    
    let strquery = `UPDATE tbllocation SET locationname='${locationname}' where locationid='${locationid}'`;
    console.log(strquery)
    con.query(strquery, (err, rows) => {
    if (err) throw err;
    res.send({message:'Success'})
    });
    })  
module.exports = router;
