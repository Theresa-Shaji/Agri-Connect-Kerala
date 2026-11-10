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
    let categoryid = req.body.categoryid;
    let categoryname = req.body.categoryname;
    let image = req.body.image;
    let strquery = `UPDATE tblcategory SET categoryname='${categoryname}',image='${image}' where categoryid='${categoryid}'`;
    console.log(strquery)
    con.query(strquery, (err, rows) => {
    if (err) throw err;
    res.send({message:'Success'})
    });
    })  
module.exports = router;
