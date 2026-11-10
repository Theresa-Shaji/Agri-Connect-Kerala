var express = require('express');
var router = express.Router();

var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "agriconnectkerala"
});

router.post('/', function(req, res, next) {

    let categoryid = req.body.id;

    console.log("Category ID:", categoryid);

    let query = `SELECT * FROM tblcategory WHERE categoryid='${categoryid}'`;

    console.log(query);

    con.query(query, function(err, rows) {
        if (err) {
            console.log(err);
            res.send({ message: "Error" });
        }
        else {
            res.send(rows);
        }
    });

});

module.exports = router;