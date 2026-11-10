var express = require('express');
var router = express.Router();

var mysql = require('mysql');

var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'agriconnectkerala'
});

con.connect(function (err) {

    if (err) {

        console.log("Purchase Report DB Error:", err);

    } else {

        console.log("Purchase Report Database Connected");

    }

});


// =====================================================
// FARMER PURCHASE REPORT
// =====================================================

router.post('/purchasereport', function (req, res) {

    var farmerid = req.body.farmerid;

    console.log(
        "Purchase Report Farmer ID:",
        farmerid
    );


    if (!farmerid) {

        return res.status(400).send({

            status: 'failed',

            message: 'Farmer ID is required'

        });

    }


    var sql = `

        /* =====================================================
           SHOP OWNER PURCHASES
           ===================================================== */

        SELECT

            pr.requestid,

            pr.productid,

            p.productname,

            pr.quantity,

            p.unit,

            pr.offeredprice,

            (pr.quantity * pr.offeredprice)
            AS totalamount,

            pr.requestdate,

            pr.status,

            'Shop Owner' AS buyertype,

            s.shopname,

            s.ownername,

            s.phoneno AS buyerphone,

            NULL AS buyername,

            NULL AS buyeremail

        FROM tblpurchaserequest pr

        INNER JOIN tblproduct p
            ON p.productid = pr.productid

        INNER JOIN tblshopowner s
            ON s.shopownerid = pr.buyerid

        WHERE pr.farmerid = ?

        AND pr.usertype = 'ShopOwner'


        UNION ALL


        /* =====================================================
           BUYER PURCHASES
           ===================================================== */

        SELECT

            pr.requestid,

            pr.productid,

            p.productname,

            pr.quantity,

            p.unit,

            pr.offeredprice,

            (pr.quantity * pr.offeredprice)
            AS totalamount,

            pr.requestdate,

            pr.status,

            'Buyer' AS buyertype,

            NULL AS shopname,

            NULL AS ownername,

            b.phone AS buyerphone,

            b.name AS buyername,

            b.email AS buyeremail

        FROM tblpurchaserequest pr

        INNER JOIN tblproduct p
            ON p.productid = pr.productid

        INNER JOIN tblbuyer b
            ON b.buyerid = pr.buyerid

        WHERE pr.farmerid = ?

        AND pr.usertype = 'Buyer'


        ORDER BY requestdate DESC

    `;


    con.query(

        sql,

        [farmerid, farmerid],

        function (err, result) {

            if (err) {

                console.log(
                    "Purchase Report SQL Error:",
                    err
                );

                return res.status(500).send({

                    status: 'failed',

                    message: 'Database error',

                    error: err.sqlMessage

                });

            }


            console.log(
                "Purchase Report Data:",
                result
            );


            res.send(result);

        }

    );

});


module.exports = router;