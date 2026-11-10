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

    let farmerid = req.body.farmerid;

    let query = `
    SELECT
        p.productid,
        p.productname,
        c.categoryname,
        p.quantity,
        p.unit,
        p.quality,
        p.expectedprice,
        p.image,
        p.description,
        p.uploaddate,
        d.districtname,
        l.locationname,
        p.status
    FROM tblproduct p
    INNER JOIN tblcategory c
        ON p.categoryid = c.categoryid
    INNER JOIN tbldistrict d
        ON p.districtid = d.districtid
    INNER JOIN tbllocation l
        ON p.locationid = l.locationid
    WHERE p.farmerid = '${farmerid}'
    ORDER BY p.productid DESC
    `;

    console.log(query);

    con.query(query, function(err, rows) {

        if (err) {

            console.log(err);

            res.send([]);

        }

        else {

            res.send(rows);

        }

    });

});

module.exports = router;