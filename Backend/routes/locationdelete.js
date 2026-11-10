var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "agriconnectkerala"
});

router.post('/', function (req, res, next) {

    let locationid = req.body.locationid;

    let query = `DELETE FROM tbllocation WHERE locationid='${locationid}'`;

    con.query(query, function (err, result) {
        if (err) throw err;

        res.send({
            message: "Location Deleted Successfully"
        });
    });

});

module.exports = router;