var express = require('express');
var router = express.Router();

var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "agriconnectkerala"
});

con.connect(function (err) {

    if (err) {

        console.log(
            "Buyer Sent Request DB Error:",
            err
        );

    } else {

        console.log(
            "Buyer Sent Request Database Connected"
        );

    }

});


// =====================================================
// BUYER - VIEW MY SENT PURCHASE REQUESTS
// =====================================================

router.post('/viewbuyersentrequest', function (req, res) {

    let buyerid = req.body.buyerid;

    console.log("========================================");
    console.log("VIEW BUYER SENT REQUESTS");
    console.log("Buyer ID:", buyerid);
    console.log("========================================");


    if (!buyerid) {

        return res.send({

            status: "failed",

            message:
                "Buyer ID not received"

        });

    }


    let sql = `

        SELECT

            pr.requestid,
            pr.buyerid,
            pr.farmerid,
            pr.productid,
            pr.usertype,

            pr.quantity AS requestquantity,
            pr.offeredprice,
            pr.message,
            pr.requestdate,
            pr.status,

            p.productname,
            p.image,
            p.quantity AS availablequantity,
            p.unit,
            p.expectedprice,

            c.categoryname,

            f.name AS farmername,
            f.phone AS farmerphone,

            d.districtname,
            l.locationname,


            /* =====================================
               BUYER PAYMENT DETAILS
            ===================================== */

            bp.paymentstatus,
            bp.buyerpaymentid,
            bp.transactionid,
            bp.advamount,
            bp.totalamount AS paidtotalamount,
            bp.paymentdate


        FROM tblpurchaserequest pr


        INNER JOIN tblproduct p
            ON pr.productid = p.productid


        LEFT JOIN tblcategory c
            ON p.categoryid = c.categoryid


        LEFT JOIN tblfarmer f
            ON pr.farmerid = f.farmerid


        LEFT JOIN tbldistrict d
            ON p.districtid = d.districtid


        LEFT JOIN tbllocation l
            ON p.locationid = l.locationid


        /* =====================================
           BUYER PAYMENT TABLE
        ===================================== */

        LEFT JOIN tblbuyerpayment bp
            ON bp.requestid = pr.requestid
            AND bp.buyerid = pr.buyerid


        WHERE pr.buyerid = ?
        AND pr.usertype = 'Buyer'


        ORDER BY pr.requestdate DESC

    `;


    con.query(
        sql,
        [buyerid],
        function (err, result) {

            if (err) {

                console.log(
                    "View Buyer Request Error:",
                    err
                );

                return res.send({

                    status:
                        "failed",

                    message:
                        "Unable to load sent purchase requests",

                    error:
                        err.sqlMessage

                });

            }


            console.log(
                "Buyer Requests:",
                result
            );


            return res.send(result);

        }
    );

});


module.exports = router;