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

        console.log("Payment Report DB Error:", err);

    } else {

        console.log("Payment Report Database Connected");

    }

});


// =====================================================
// FARMER PAYMENT REPORT
// =====================================================

router.post('/paymentreport', function (req, res) {

    var farmerid = req.body.farmerid;

    console.log("Payment Report Farmer ID:", farmerid);


    if (!farmerid) {

        return res.status(400).send({

            status: 'failed',

            message: 'Farmer ID is required'

        });

    }


    // =====================================================
    // GET PAYMENTS FROM BOTH TABLES
    // =====================================================

    var sql = `

        /* =================================================
           SHOP OWNER PAYMENTS
           ================================================= */

        SELECT

            pay.paymentid,

            pay.requestid,

            p.productname,

            p.unit,

            pr.quantity,

            pr.offeredprice,

            (pr.quantity * pr.offeredprice)
                AS totalamount,

            pay.advamount,

            pay.paymentdate,

            pay.paymentstatus,

            pay.transactionid,

            'Shop Owner' AS buyertype,

            s.shopname,

            s.ownername,

            s.phoneno AS buyerphone,

            NULL AS buyername,

            NULL AS buyeremail

        FROM tblpayment pay

        INNER JOIN tblpurchaserequest pr

            ON pr.requestid = pay.requestid

        INNER JOIN tblproduct p

            ON p.productid = pr.productid

        LEFT JOIN tblshopowner s

            ON s.shopownerid = pay.shopownerid

        WHERE pay.farmerid = ?

        AND pr.usertype = 'ShopOwner'


        UNION ALL


        /* =================================================
           BUYER PAYMENTS
           ================================================= */

        SELECT

            bp.buyerpaymentid AS paymentid,

            bp.requestid,

            p.productname,

            p.unit,

            bp.quantity,

            bp.priceperunit AS offeredprice,

            bp.totalamount,

            bp.advamount,

            bp.paymentdate,

            bp.paymentstatus,

            bp.transactionid,

            'Buyer' AS buyertype,

            NULL AS shopname,

            NULL AS ownername,

            b.phone AS buyerphone,

            b.name AS buyername,

            b.email AS buyeremail

        FROM tblbuyerpayment bp

        INNER JOIN tblpurchaserequest pr

            ON pr.requestid = bp.requestid

        INNER JOIN tblproduct p

            ON p.productid = bp.productid

        LEFT JOIN tblbuyer b

            ON b.buyerid = bp.buyerid

        WHERE bp.farmerid = ?

        AND pr.usertype = 'Buyer'


        ORDER BY paymentdate DESC

    `;


    con.query(

        sql,

        [farmerid, farmerid],

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
                "Payment Report Data:",
                result
            );


            res.send(result);

        }

    );

});


module.exports = router;