var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "agriconnectkerala"
});

// Registered Users Report
router.get('/', function (req, res, next) {

    let query = `
        SELECT 
            f.name AS name,
            'Farmer' AS usertype,
            f.email AS email,
            f.phone AS phone,
            d.districtname AS district,
            l.locationname AS location,
            f.regdate AS regdate,
            f.status AS status
        FROM tblfarmer f
        LEFT JOIN tbldistrict d ON f.districtid = d.districtid
        LEFT JOIN tbllocation l ON f.locationid = l.locationid

        UNION ALL

        SELECT 
            s.ownername AS name,
            'Shop Owner' AS usertype,
            s.email AS email,
            s.phoneno AS phone,
            d.districtname AS district,
            l.locationname AS location,
            s.regdate AS regdate,
            s.status AS status
        FROM tblshopowner s
        LEFT JOIN tbldistrict d ON s.districtid = d.districtid
        LEFT JOIN tbllocation l ON s.locationid = l.locationid

        UNION ALL

        SELECT 
            b.name AS name,
            'Buyer' AS usertype,
            b.email AS email,
            b.phone AS phone,
            d.districtname AS district,
            l.locationname AS location,
            b.regdate AS regdate,
            b.status AS status
        FROM tblbuyer b
        LEFT JOIN tbldistrict d ON b.districtid = d.districtid
        LEFT JOIN tbllocation l ON b.locationid = l.locationid

        ORDER BY regdate DESC
    `;

    con.query(query, function (err, rows) {

        if (err) {
            console.log(err);
            return res.send({
                message: 'Failed',
                error: err
            });
        }

        res.send({
            message: 'Success',
            data: rows
        });

    });

});

module.exports = router;