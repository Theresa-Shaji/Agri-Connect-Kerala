var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "agriconnectkerala"
});

router.get('/', function (req, res) {

    let query = `
        SELECT
            p.productid,
            p.productname,
            c.categoryname,
            p.quantity,
            p.unit,
            p.quality,
            p.expectedprice,
            p.uploaddate,
            p.status,

            f.name AS farmername,

            d.districtname AS district,
            l.locationname AS location,

            pu.price AS marketprice,
            pu.updatedate AS priceupdatedate,
            pu.unit AS priceunit,
            pu.trend

        FROM tblproduct p

        LEFT JOIN tblcategory c
            ON p.categoryid = c.categoryid

        LEFT JOIN tblfarmer f
            ON p.farmerid = f.farmerid

        LEFT JOIN tbldistrict d
            ON p.districtid = d.districtid

        LEFT JOIN tbllocation l
            ON p.locationid = l.locationid

        LEFT JOIN tblpriceupdate pu
            ON pu.categoryid = p.categoryid

            AND pu.updatedate = (
                SELECT MAX(pu2.updatedate)
                FROM tblpriceupdate pu2
                WHERE pu2.categoryid = p.categoryid
            )

        ORDER BY p.uploaddate DESC
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