var express = require('express');
var router = express.Router();

var mysql = require('mysql');

var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'agriconnectkerala',
    charset: 'utf8mb4'
});

con.connect(function (err) {

    if (err) {

        console.log('Payment Report DB Error:', err);

    } else {

        console.log('Payment Report Database Connected');

    }

});


// =====================================================
// FARMER PAYMENT REPORT
// =====================================================

router.post('/paymentreport', function (req, res) {

    var farmerid = req.body.farmerid;

    console.log("=================================");
    console.log("FARMER PAYMENT REPORT");
    console.log("Farmer ID:", farmerid);
    console.log("Request Body:", req.body);
    console.log("=================================");


    if (!farmerid) {

        return res.status(400).send({

            status: 'failed',

            message: 'Farmer ID is required'

        });

    }


    var sql = `

        SELECT

            /* =========================
               PAYMENT DETAILS
               ========================= */

            pay.paymentid,

            pay.requestid,

            pay.advamount,

            pay.paymentdate,

            pay.paymentstatus,

            pay.transactionid,


            /* =========================
               PRODUCT DETAILS
               ========================= */

            p.productid,

            p.productname,

            p.unit,


            /* =========================
               PURCHASE REQUEST DETAILS
               ========================= */

            pr.quantity,

            pr.offeredprice,

            (pr.quantity * pr.offeredprice)
                AS totalamount,

            pr.usertype,


            /* =========================
               BUYER TYPE
               ========================= */

            CASE

                WHEN pr.usertype = 'ShopOwner'
                    THEN 'Shop Owner'

                WHEN pr.usertype = 'Buyer'
                    THEN 'Buyer'

                ELSE 'Unknown'

            END AS buyertype,


            /* =========================
               SHOP OWNER DETAILS
               ========================= */

            s.shopname,

            s.ownername,

            s.phoneno AS shopownerphone,

            s.email AS shopowneremail,


            /* =========================
               BUYER DETAILS
               ========================= */

            b.name AS buyername,

            b.email AS buyeremail,

            b.phone AS buyerphone,


            /* =========================
               DISPLAY NAME
               ========================= */

            CASE

                WHEN pr.usertype = 'ShopOwner'
                    THEN s.shopname

                WHEN pr.usertype = 'Buyer'
                    THEN b.name

                ELSE '-'

            END AS displayname,


            /* =========================
               DISPLAY PHONE
               ========================= */

            CASE

                WHEN pr.usertype = 'ShopOwner'
                    THEN s.phoneno

                WHEN pr.usertype = 'Buyer'
                    THEN b.phone

                ELSE '-'

            END AS displayphone,


            /* =========================
               DISPLAY EMAIL
               ========================= */

            CASE

                WHEN pr.usertype = 'ShopOwner'
                    THEN s.email

                WHEN pr.usertype = 'Buyer'
                    THEN b.email

                ELSE '-'

            END AS displayemail


        FROM tblpayment pay


        /* =========================
           PURCHASE REQUEST
           ========================= */

        INNER JOIN tblpurchaserequest pr

            ON pr.requestid = pay.requestid


        /* =========================
           PRODUCT
           ========================= */

        INNER JOIN tblproduct p

            ON p.productid = pr.productid


        /* =========================
           SHOP OWNER
           ========================= */

        LEFT JOIN tblshopowner s

            ON s.shopownerid = pr.buyerid

            AND pr.usertype = 'ShopOwner'


        /* =========================
           BUYER
           ========================= */

        LEFT JOIN tblbuyer b

            ON b.buyerid = pr.buyerid

            AND pr.usertype = 'Buyer'


        /* =========================
           FARMER
           ========================= */

        WHERE pay.farmerid = ?


        /* =========================
           LATEST PAYMENT FIRST
           ========================= */

        ORDER BY pay.paymentdate DESC

    `;


    con.query(

        sql,

        [farmerid],

        function (err, result) {

            if (err) {

                console.log(
                    "Payment Report SQL Error:",
                    err
                );

                return res.status(500).send({

                    status: 'failed',

                    message: 'Database error',

                    error: err.sqlMessage

                });

            }


            console.log(
                "Payment Report Result:",
                result
            );


            res.send(result);

        }

    );

});


module.exports = router;