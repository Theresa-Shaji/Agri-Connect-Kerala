var express = require('express');
var router = express.Router();

var mysql = require('mysql');

var con = mysql.createConnection({

    host: "localhost",
    user: "root",
    password: "",
    database: "agriconnectkerala"

});


con.connect(function(err){

    if(err)
    {
        console.log("Database connection failed");
        console.log(err);
    }
    else
    {
        console.log("Database connected");
    }

});


// ===============================
// PAYMENT DETAILS VIEW
// ===============================

router.post('/paymentdetails', function(req, res){

    console.log(req.body);

    var requestid = req.body.requestid;


    var sql = `

    SELECT

        pr.requestid,

        pr.quantity,

        pr.offeredprice,

        pr.status,

        p.productname,

        p.image,

        p.unit,

        f.farmerid,

        f.name AS farmername,

        f.phone AS phoneno,

        pay.advamount,

        pay.paymentdate,

        pay.paymentstatus,

        pay.transactionid

    FROM tblpurchaserequest pr

    INNER JOIN tblproduct p

    ON pr.productid = p.productid

    INNER JOIN tblfarmer f

    ON p.farmerid = f.farmerid

    LEFT JOIN tblpayment pay

    ON pr.requestid = pay.requestid

    WHERE pr.requestid = ?

    `;


    con.query(sql, [requestid], function(err, result){

        if(err)
        {
            console.log(err);

            res.status(500).send(err);
        }
        else
        {
            console.log("Payment Details Result:", result);

            res.send(result);
        }

    });

});


// ===============================
// SAVE PAYMENT DETAILS
// ===============================

// ===============================
// SAVE PAYMENT DETAILS
// ===============================

router.post('/savepayment', function(req, res){

    console.log("Payment Data:", req.body);

    var sql = `

        INSERT INTO tblpayment
        (
            requestid,
            farmerid,
            shopownerid,
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
            CURDATE(),
            ?,
            ?
        )

    `;

    var values = [

        req.body.requestid,

        req.body.farmerid,

        req.body.shopownerid,

        req.body.advamount,

        "Paid",

        req.body.transactionid

    ];

    con.query(sql, values, function(err, result){

        if(err)
        {
            console.log("Payment Save Error:", err);

            res.status(500).send({

                status: "failed",

                error: err.sqlMessage

            });
        }
        else
        {
            console.log("Payment Inserted:", result);

            // Change purchase request status
            var updateSql = `

                UPDATE tblpurchaserequest

                SET status = 'Advance Paid'

                WHERE requestid = ?

            `;

            con.query(
                updateSql,
                [req.body.requestid],
                function(err2, result2)
                {

                    if(err2)
                    {
                        console.log(
                            "Request Status Update Error:",
                            err2
                        );

                        return res.status(500).send({

                            status: "failed",

                            error: err2.sqlMessage

                        });
                    }

                    res.send({

                        status: "success",

                        message:
                        "Advance Payment Saved Successfully"

                    });

                }
            );

        }

    });

});

module.exports = router;