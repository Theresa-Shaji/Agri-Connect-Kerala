var express = require('express');
var router = express.Router();
var mysql = require('mysql');


// =====================================================
// DATABASE CONNECTION
// =====================================================

var con = mysql.createConnection({

    host: "localhost",
    user: "root",
    password: "",
    database: "agriconnectkerala"

});


// =====================================================
// CONNECT DATABASE
// =====================================================

con.connect(function(err) {

    if (err) {

        console.log("Database Connection Failed");
        console.log(err);

    }
    else {

        console.log("Database Connected");

    }

});


// =====================================================
// SHOP OWNER
// VIEW ONLY SHOP OWNER SENT PURCHASE REQUESTS
// =====================================================

router.post('/viewsentrequest', function(req, res) {

    var shopownerid = req.body.shopownerid;


    console.log("========================================");
    console.log("SHOP OWNER VIEW SENT REQUEST");
    console.log("Shop Owner ID :", shopownerid);
    console.log("========================================");


    // =====================================================
    // CHECK SHOP OWNER ID
    // =====================================================

    if (!shopownerid) {

        return res.status(400).send({

            status: "failed",

            message: "Shop Owner ID is required."

        });

    }


    // =====================================================
    // QUERY
    // =====================================================

    var sql = `

        SELECT

            pr.requestid,

            pr.buyerid,

            pr.usertype,

            pr.farmerid,

            pr.productid,

            pr.quantity AS requestquantity,

            pr.offeredprice,

            pr.message,

            pr.requestdate,

            pr.status,


            /* ===============================
               PRODUCT
            =============================== */

            p.productid,

            p.productname,

            p.image,

            p.expectedprice,

            p.unit,


            /* ===============================
               CATEGORY
            =============================== */

            c.categoryname,


            /* ===============================
               FARMER
            =============================== */

            f.name AS farmername,

            f.phone AS phoneno,


            /* ===============================
               DISTRICT
            =============================== */

            d.districtname,


            /* ===============================
               LOCATION
            =============================== */

            l.locationname,


            /* ===============================
               PAYMENT
            =============================== */

            pay.paymentstatus,

            pay.advamount,

            pay.transactionid,

            pay.paymentdate


        FROM tblpurchaserequest pr


        /* PRODUCT */

        INNER JOIN tblproduct p

            ON pr.productid = p.productid


        /* CATEGORY */

        INNER JOIN tblcategory c

            ON p.categoryid = c.categoryid


        /* FARMER */

        INNER JOIN tblfarmer f

            ON pr.farmerid = f.farmerid


        /* DISTRICT */

        INNER JOIN tbldistrict d

            ON p.districtid = d.districtid


        /* LOCATION */

        INNER JOIN tbllocation l

            ON p.locationid = l.locationid


        /* PAYMENT */

        LEFT JOIN tblpayment pay

            ON pr.requestid = pay.requestid


        /* =========================================
           IMPORTANT FILTER
           ONLY SHOP OWNER REQUESTS
        ========================================= */

        WHERE pr.buyerid = ?

        AND pr.usertype = 'ShopOwner'


        ORDER BY pr.requestdate DESC

    `;


    console.log(
        "Executing Shop Owner Request Query..."
    );


    con.query(

        sql,

        [shopownerid],

        function(err, result) {

            if (err) {

                console.log(
                    "Shop Owner View Sent Request Error:",
                    err
                );


                return res.status(500).send({

                    status: "failed",

                    message:
                        err.sqlMessage ||
                        "Unable to load shop owner requests."

                });

            }


            console.log(
                "Number of Shop Owner Requests:",
                result.length
            );


            console.log(
                "Shop Owner Requests:",
                result
            );


            return res.send(result);

        }

    );

});


// =====================================================
// PAYMENT DETAILS
// ONLY SHOP OWNER REQUEST
// =====================================================

router.post('/paymentdetails', function(req, res) {

    var requestid = req.body.requestid;


    console.log(
        "Payment Request ID:",
        requestid
    );


    var sql = `

        SELECT

            pr.requestid,

            pr.buyerid,

            pr.usertype,

            pr.quantity AS requestquantity,

            pr.offeredprice,


            p.productname,

            p.image,

            p.unit,


            f.farmerid,

            f.name AS farmername,

            f.phone AS phoneno


        FROM tblpurchaserequest pr


        INNER JOIN tblproduct p

            ON pr.productid = p.productid


        INNER JOIN tblfarmer f

            ON pr.farmerid = f.farmerid


        WHERE pr.requestid = ?

        AND pr.usertype = 'ShopOwner'

    `;


    con.query(

        sql,

        [requestid],

        function(err, result) {

            if (err) {

                console.log(err);


                return res.status(500).send({

                    status: "failed",

                    error: err.sqlMessage

                });

            }


            res.send(result);

        }

    );

});


// =====================================================
// SHOP OWNER - ADD ADVANCE PAYMENT
// =====================================================

router.post('/addpayment', function(req, res) {

    var data = req.body;


    console.log(
        "Shop Owner Payment Data:",
        data
    );


    var sql = `

        INSERT INTO tblpayment
        (
            requestid,
            buyerid,
            shopownerid,
            farmerid,
            advamount,
            paymentdate,
            paymentstatus,
            transactionid
        )

        VALUES
        (
            ?,
            ?,
            ?,
            ?,
            ?,
            CURDATE(),
            ?,
            ?
        )

    `;


    con.query(

        sql,

        [

            data.requestid,

            data.buyerid,

            data.shopownerid,

            data.farmerid,

            data.advamount,

            data.paymentstatus,

            data.transactionid

        ],

        function(err, result) {

            if (err) {

                console.log(
                    "Payment Insert Error:",
                    err
                );


                return res.status(500).send({

                    status: "failed",

                    error: err.sqlMessage

                });

            }


            // =========================================
            // UPDATE REQUEST STATUS
            // =========================================

            var updateSql = `

                UPDATE tblpurchaserequest

                SET status = 'Advance Paid'

                WHERE requestid = ?

                AND buyerid = ?

                AND usertype = 'ShopOwner'

            `;


            con.query(

                updateSql,

                [

                    data.requestid,

                    data.shopownerid

                ],

                function(err2, result2) {

                    if (err2) {

                        console.log(
                            "Status Update Error:",
                            err2
                        );


                        return res.status(500).send({

                            status: "failed",

                            error: err2.sqlMessage

                        });

                    }


                    return res.send({

                        status: "success",

                        message:
                            "Advance payment completed successfully."

                    });

                }

            );

        }

    );

});


// =====================================================
// EXPORT
// =====================================================

module.exports = router;