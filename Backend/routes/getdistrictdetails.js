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
    let districtid = req.body.id;
    let query = `SELECT * FROM tbldistrict where districtid ='${districtid}'`;
    console.log(query);
    con.query(query, (err, rows) => {
    if (err) throw err;
    res.send(rows);
    });
    });
/* GET users listing. */

module.exports = router;
