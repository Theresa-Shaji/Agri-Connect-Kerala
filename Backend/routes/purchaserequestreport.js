var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "agriconnectkerala"
});


// ==========================================
// PURCHASE REQUEST REPORT
// ==========================================

router.get('/', function (req, res) {

    let query = `

        SELECT

            pr.requestid,

            p.productname,

            f.name AS farmername,

            CASE
                WHEN LOWER(pr.usertype) = 'buyer'
                    THEN b.name

                WHEN LOWER(pr.usertype) = 'shopowner'
                    THEN s.ownername

                ELSE 'Unknown'
            END AS requestername,

            CASE
                WHEN LOWER(pr.usertype) = 'buyer'
                    THEN b.email

                WHEN LOWER(pr.usertype) = 'shopowner'
                    THEN s.email

                ELSE NULL
            END AS requesteremail,

            pr.usertype,

            pr.quantity,

            pr.offeredprice,

            pr.message,

            pr.requestdate,

            pr.status,

            d.districtname AS district,

            l.locationname AS location

        FROM tblpurchaserequest pr

        LEFT JOIN tblproduct p
            ON pr.productid = p.productid

        LEFT JOIN tblfarmer f
            ON pr.farmerid = f.farmerid

        LEFT JOIN tblbuyer b
            ON pr.buyerid = b.buyerid
            AND LOWER(pr.usertype) = 'buyer'

        LEFT JOIN tblshopowner s
            ON pr.buyerid = s.shopownerid
            AND LOWER(pr.usertype) = 'shopowner'

        LEFT JOIN tbldistrict d
            ON f.districtid = d.districtid

        LEFT JOIN tbllocation l
            ON f.locationid = l.locationid

        ORDER BY pr.requestdate DESC

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