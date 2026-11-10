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
    console.log(districtid);
    let query = `SELECT * FROM tbllocation l inner join tbldistrict d on d.districtid=l.districtid where l.districtid='${districtid}'`;
    // console.log(query);
    con.query(query, (err, rows) => {
        if (err) throw err;
        res.send(rows);
    });
});
module.exports = router
