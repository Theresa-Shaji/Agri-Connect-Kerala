var express = require('express');
var router = express.Router();

var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "agriconnectkerala"
});

con.connect(function(err) {

    if (err) {
        console.log("Database connection failed");
        console.log(err);
    } else {
        console.log("Purchase Request Database Connected");
    }

});


// =====================================================
// SEND PURCHASE REQUEST - SHOP OWNER
// =====================================================

router.post('/sendrequest', function(req, res) {

    let data = {
        buyerid: req.body.buyerid,
        usertype: "ShopOwner",
        farmerid: req.body.farmerid,
        productid: req.body.productid,
        quantity: req.body.quantity,
        offeredprice: req.body.offeredprice,
        message: req.body.message,
        requestdate: new Date(),
        status: "Pending"
    };

    console.log("Shop Owner Purchase Request:", data);

    let sql = "INSERT INTO tblpurchaserequest SET ?";

    con.query(sql, data, function(err, result) {

        if (err) {

            console.log("Purchase Request Insert Error:", err);

            return res.send({
                status: "failed",
                message: err.sqlMessage
            });

        }

        res.send({
            status: "success",
            message: "Purchase request sent successfully.",
            requestid: result.insertId
        });

    });

});


// =====================================================
// VIEW PURCHASE REQUESTS - FARMER
// =====================================================

router.post('/viewrequest', function(req, res) {

    let farmerid = req.body.farmerid;

    console.log("Farmer Purchase Requests:", req.body);

    let sql = `

        SELECT

            pr.requestid,
            pr.usertype,

            pr.quantity AS requestquantity,
            pr.offeredprice,
            pr.message,
            pr.requestdate,
            pr.status,

            p.productid,
            p.productname,
            p.image,
            p.quantity,
            p.unit,
            p.expectedprice,

            c.categoryname,

            d.districtname,

            l.locationname,

            /* =========================
               SHOP OWNER DETAILS
               ========================= */

            CASE
                WHEN pr.usertype = 'ShopOwner'
                THEN s.shopname
                ELSE NULL
            END AS shopname,

            CASE
                WHEN pr.usertype = 'ShopOwner'
                THEN s.ownername
                ELSE NULL
            END AS ownername,

            CASE
                WHEN pr.usertype = 'ShopOwner'
                THEN s.phoneno
                ELSE NULL
            END AS shopownerphone,

            /* =========================
               BUYER DETAILS
               ========================= */

            CASE
                WHEN pr.usertype = 'Buyer'
                THEN b.name
                ELSE NULL
            END AS buyername,

            CASE
                WHEN pr.usertype = 'Buyer'
                THEN b.phone
                ELSE NULL
            END AS buyerphone,

            CASE
                WHEN pr.usertype = 'Buyer'
                THEN b.email
                ELSE NULL
            END AS buyeremail,

            /* =========================
               PRICE DIFFERENCE
               ========================= */

            (pr.offeredprice - p.expectedprice)
            AS priceDifference,

            /* =========================
               TOTAL VALUE
               ========================= */

            (pr.offeredprice * pr.quantity)
            AS totalvalue

        FROM tblpurchaserequest pr

        INNER JOIN tblproduct p
            ON pr.productid = p.productid

        LEFT JOIN tblcategory c
            ON p.categoryid = c.categoryid

        LEFT JOIN tbldistrict d
            ON p.districtid = d.districtid

        LEFT JOIN tbllocation l
            ON p.locationid = l.locationid

        /* Shop Owner */

        LEFT JOIN tblshopowner s
            ON pr.buyerid = s.shopownerid
            AND pr.usertype = 'ShopOwner'

        /* Buyer */

        LEFT JOIN tblbuyer b
            ON pr.buyerid = b.buyerid
            AND pr.usertype = 'Buyer'

        WHERE pr.farmerid = ?

        ORDER BY pr.requestdate DESC

    `;

    con.query(
        sql,
        [farmerid],
        function(err, result) {

            if (err) {

                console.log(
                    "View Purchase Request Error:",
                    err
                );

                return res.send({
                    status: "failed",
                    error: err.sqlMessage
                });

            }

            console.log(
                "Purchase Request Result:",
                result
            );

            res.send(result);

        }
    );

});


// =====================================================
// ACCEPT PURCHASE REQUEST
// =====================================================

router.post('/acceptrequest', function(req, res) {

    let requestid = req.body.requestid;

    console.log("Accept Request ID:", requestid);

    if (!requestid) {

        return res.send({
            status: "failed",
            message: "Request ID is required."
        });

    }


    // -------------------------------------------------
    // FIRST GET THE REQUEST DETAILS
    // -------------------------------------------------

    let getRequestSQL = `

        SELECT
            requestid,
            farmerid,
            productid,
            quantity,
            status

        FROM tblpurchaserequest

        WHERE requestid = ?

    `;


    con.query(
        getRequestSQL,
        [requestid],
        function(err, requestResult) {

            if (err) {

                console.log("Get Request Error:", err);

                return res.send({
                    status: "failed",
                    message: err.sqlMessage
                });

            }


            if (requestResult.length === 0) {

                return res.send({
                    status: "failed",
                    message: "Purchase request not found."
                });

            }


            let farmerid = requestResult[0].farmerid;
            let productid = requestResult[0].productid;


            // -------------------------------------------------
            // ACCEPT SELECTED REQUEST
            // -------------------------------------------------

            let acceptSQL = `

                UPDATE tblpurchaserequest

                SET status = 'Accepted'

                WHERE requestid = ?

            `;


            con.query(
                acceptSQL,
                [requestid],
                function(err, acceptResult) {

                    if (err) {

                        console.log(
                            "Accept Request Error:",
                            err
                        );

                        return res.send({
                            status: "failed",
                            message: err.sqlMessage
                        });

                    }


                    // -------------------------------------------------
                    // REJECT ALL OTHER REQUESTS FOR SAME PRODUCT
                    // -------------------------------------------------

                    let rejectOtherSQL = `

                        UPDATE tblpurchaserequest

                        SET status = 'Rejected'

                        WHERE farmerid = ?

                        AND productid = ?

                        AND requestid != ?

                        AND status = 'Pending'

                    `;


                    con.query(
                        rejectOtherSQL,
                        [
                            farmerid,
                            productid,
                            requestid
                        ],
                        function(err, rejectResult) {

                            if (err) {

                                console.log(
                                    "Reject Other Requests Error:",
                                    err
                                );

                                return res.send({
                                    status: "failed",
                                    message: err.sqlMessage
                                });

                            }


                            console.log(
                                "Other requests rejected:",
                                rejectResult.affectedRows
                            );


                            res.send({

                                status: "success",

                                message:
                                    "Purchase request accepted successfully. Other requests for this product have been rejected."

                            });

                        }
                    );

                }
            );

        }
    );

});


// =====================================================
// REJECT PURCHASE REQUEST
// =====================================================

router.post('/rejectrequest', function(req, res) {

    let requestid = req.body.requestid;

    console.log("Reject Request ID:", requestid);

    let sql = `

        UPDATE tblpurchaserequest

        SET status = 'Rejected'

        WHERE requestid = ?

    `;

    con.query(
        sql,
        [requestid],
        function(err, result) {

            if (err) {

                console.log(
                    "Reject Request Error:",
                    err
                );

                return res.send({
                    status: "failed",
                    message: err.sqlMessage
                });

            }

            res.send({

                status: "success",

                message: "Purchase request rejected."

            });

        }
    );

});


module.exports = router;