var express = require('express');
var router = express.Router();

var mysql = require('mysql');

var con = mysql.createConnection({

    host: "localhost",
    user: "root",
    password: "",
    database: "agriconnectkerala"

});


// =====================================
// DATABASE CONNECTION
// =====================================

con.connect(function(err) {

    if (err) {

        console.log("Database connection failed");
        console.log(err);

    }
    else {

        console.log("Farmer Payment Database Connected");

    }

});


// =====================================
// FARMER PAYMENT DETAILS
// SHOP OWNER + BUYER
// =====================================

router.post('/farmerpaymentdetails', function(req, res) {

    var farmerid = req.body.farmerid;

    console.log("Farmer ID :", farmerid);


    if (!farmerid) {

        return res.status(400).send({

            status: "failed",
            message: "Farmer ID is required."

        });

    }


    var sql = `

    SELECT *

    FROM (

        /* =========================================
           SHOP OWNER PAYMENTS
        ========================================== */

        SELECT

            pay.paymentid,

            pay.requestid,

            pay.farmerid,

            pay.advamount,

            pay.paymentdate,

            pay.paymentstatus,

            pay.transactionid,


            pr.quantity AS requestquantity,

            pr.offeredprice,


            p.productname,

            p.image,

            p.unit,


            s.shopname,

            s.ownername,

            s.phoneno,


            NULL AS buyername,

            NULL AS buyerphone,


            'Shop Owner' AS paymenttype


        FROM tblpayment pay


        INNER JOIN tblpurchaserequest pr

            ON pay.requestid = pr.requestid


        INNER JOIN tblproduct p

            ON pr.productid = p.productid


        INNER JOIN tblshopowner s

            ON pay.shopownerid = s.shopownerid


        WHERE pay.farmerid = ?

        AND pay.paymentstatus = 'Paid'


        UNION ALL


        /* =========================================
           BUYER PAYMENTS
        ========================================== */

        SELECT

            NULL AS paymentid,

            bp.requestid,

            bp.farmerid,

            bp.advamount,

            bp.paymentdate,

            bp.paymentstatus,

            bp.transactionid,


            pr.quantity AS requestquantity,

            pr.offeredprice,


            p.productname,

            p.image,

            p.unit,


            NULL AS shopname,

            NULL AS ownername,

            NULL AS phoneno,


            b.name AS buyername,

            b.phone AS buyerphone,


            'Buyer' AS paymenttype


        FROM tblbuyerpayment bp


        INNER JOIN tblpurchaserequest pr

            ON bp.requestid = pr.requestid


        INNER JOIN tblproduct p

            ON pr.productid = p.productid


        INNER JOIN tblbuyer b

            ON bp.buyerid = b.buyerid


        WHERE bp.farmerid = ?

        AND bp.paymentstatus = 'Paid'

    ) AS allpayments


    ORDER BY paymentdate DESC

    `;


    con.query(

        sql,

        [farmerid, farmerid],

        function(err, result) {

            if (err) {

                console.log(
                    "Payment Query Error:",
                    err
                );

                return res.status(500).send({

                    status: "failed",

                    message: "Unable to load payment details.",

                    error: err.sqlMessage

                });

            }


            console.log(
                "Farmer Payments Result:",
                result
            );

            console.log(
                "Number of Payments:",
                result.length
            );


            res.send(result);

        }

    );

});


module.exports = router;