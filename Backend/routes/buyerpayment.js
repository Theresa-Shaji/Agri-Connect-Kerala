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
        console.log("Buyer Payment DB Error:", err);
    } else {
        console.log("Buyer Payment Database Connected");
    }

});


// =====================================================
// BUYER - GET PAYMENT DETAILS
// =====================================================

router.post('/buyerpaymentdetails', function (req, res) {

    let requestid = req.body.requestid;
    let buyerid = req.body.buyerid;

    console.log("========================================");
    console.log("BUYER PAYMENT DETAILS");
    console.log("Request ID:", requestid);
    console.log("Buyer ID:", buyerid);
    console.log("========================================");


    if (!requestid) {

        return res.send({
            status: "failed",
            message: "Request ID not received"
        });

    }


    if (!buyerid) {

        return res.send({
            status: "failed",
            message: "Buyer ID not received"
        });

    }


    let sql = `

        SELECT

            pr.requestid,
            pr.buyerid,
            pr.farmerid,
            pr.productid,

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
            l.locationname

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

        WHERE pr.requestid = ?
        AND pr.buyerid = ?
        AND pr.usertype = 'Buyer'

        LIMIT 1

    `;


    con.query(
        sql,
        [
            requestid,
            buyerid
        ],
        function (err, result) {

            if (err) {

                console.log(
                    "Buyer Payment Details Error:",
                    err
                );

                return res.send({
                    status: "failed",
                    message: "Database error",
                    error: err.sqlMessage
                });

            }


            if (result.length > 0) {

                console.log(
                    "Buyer Payment Details:",
                    result[0]
                );

                return res.send({
                    status: "success",
                    data: result[0]
                });

            }


            return res.send({
                status: "failed",
                message: "Purchase request not found"
            });

        }
    );

});


// =====================================================
// BUYER - SAVE PAYMENT
// =====================================================

router.post('/savebuyerpayment', function (req, res) {

    console.log("========================================");
    console.log("SAVE BUYER PAYMENT");
    console.log("Received Data:", req.body);
    console.log("========================================");


    let requestid = req.body.requestid;
    let buyerid = req.body.buyerid;
    let farmerid = req.body.farmerid;
    let productid = req.body.productid;

    let quantity = req.body.quantity;
    let priceperunit = req.body.priceperunit;
    let totalamount = req.body.totalamount;
    let advamount = req.body.advamount;

    let transactionid = req.body.transactionid;


    // =====================================================
    // VALIDATION
    // =====================================================

    if (!requestid) {

        return res.send({
            status: "failed",
            message: "Request ID is required"
        });

    }


    if (!buyerid) {

        return res.send({
            status: "failed",
            message: "Buyer ID is required"
        });

    }


    if (!farmerid) {

        return res.send({
            status: "failed",
            message: "Farmer ID is required"
        });

    }


    if (!productid) {

        return res.send({
            status: "failed",
            message: "Product ID is required"
        });

    }


    if (!quantity || Number(quantity) <= 0) {

        return res.send({
            status: "failed",
            message: "Quantity is required"
        });

    }


    if (!priceperunit || Number(priceperunit) <= 0) {

        return res.send({
            status: "failed",
            message: "Price per unit is required"
        });

    }


    if (!totalamount || Number(totalamount) <= 0) {

        return res.send({
            status: "failed",
            message: "Total amount is required"
        });

    }


    if (!advamount || Number(advamount) <= 0) {

        return res.send({
            status: "failed",
            message: "Advance amount is required"
        });

    }


    // =====================================================
    // CHECK PURCHASE REQUEST
    // =====================================================

    let requestSql = `

        SELECT

            requestid,
            buyerid,
            farmerid,
            productid,
            quantity,
            offeredprice,
            status,
            usertype

        FROM tblpurchaserequest

        WHERE requestid = ?
        AND buyerid = ?
        AND farmerid = ?
        AND usertype = 'Buyer'

        LIMIT 1

    `;


    con.query(
        requestSql,
        [
            requestid,
            buyerid,
            farmerid
        ],
        function (err, requestResult) {

            if (err) {

                console.log(
                    "Purchase Request Check Error:",
                    err
                );

                return res.send({
                    status: "failed",
                    message: err.sqlMessage
                });

            }


            if (requestResult.length === 0) {

                return res.send({

                    status: "failed",

                    message:
                        "Purchase request not found or buyer/farmer mismatch."

                });

            }


            let request = requestResult[0];


            // =====================================================
            // CHECK REQUEST STATUS
            // =====================================================

            if (
                String(request.status).toLowerCase() !==
                "accepted"
            ) {

                return res.send({

                    status: "failed",

                    message:
                        "Payment can be made only for an accepted purchase request."

                });

            }


            // =====================================================
            // CHECK EXISTING BUYER PAYMENT
            // =====================================================

            let checkPaymentSql = `

                SELECT buyerpaymentid

                FROM tblbuyerpayment

                WHERE requestid = ?
                AND buyerid = ?

                LIMIT 1

            `;


            con.query(
                checkPaymentSql,
                [
                    requestid,
                    buyerid
                ],
                function (err, paymentResult) {

                    if (err) {

                        console.log(
                            "Buyer Payment Check Error:",
                            err
                        );

                        return res.send({

                            status: "failed",

                            message:
                                err.sqlMessage

                        });

                    }


                    if (paymentResult.length > 0) {

                        return res.send({

                            status: "failed",

                            message:
                                "Payment already exists for this purchase request."

                        });

                    }


                    // =====================================================
                    // CREATE TRANSACTION ID
                    // =====================================================

                    let finalTransactionId =
                        transactionid ||
                        (
                            "BUY" +
                            Date.now()
                        );


                    // =====================================================
                    // BUYER PAYMENT DATA
                    // IMPORTANT:
                    // INSERT INTO tblbuyerpayment
                    // NOT tblpayment
                    // =====================================================

                    let paymentData = {

                        requestid: requestid,

                        buyerid: buyerid,

                        farmerid: farmerid,

                        productid: productid,

                        quantity: quantity,

                        priceperunit: priceperunit,

                        totalamount: totalamount,

                        advamount: advamount,

                        paymentdate: new Date(),

                        paymentstatus: "Paid",

                        transactionid:
                            finalTransactionId

                    };


                    console.log(
                        "Saving Buyer Payment:",
                        paymentData
                    );


                    // =====================================================
                    // INSERT INTO BUYER PAYMENT TABLE
                    // =====================================================

                    let insertSql =
                        "INSERT INTO tblbuyerpayment SET ?";


                    con.query(
                        insertSql,
                        paymentData,
                        function (err, result) {

                            if (err) {

                                console.log(
                                    "Save Buyer Payment Error:",
                                    err
                                );

                                return res.send({

                                    status:
                                        "failed",

                                    message:
                                        err.sqlMessage

                                });

                            }


                            console.log(
                                "Buyer Payment Saved. ID:",
                                result.insertId
                            );


                            // =================================================
                            // UPDATE PURCHASE REQUEST STATUS
                            // =================================================

                            let updateRequestSql = `

                                UPDATE tblpurchaserequest

                                SET status = 'Paid'

                                WHERE requestid = ?
                                AND buyerid = ?

                            `;


                            con.query(
                                updateRequestSql,
                                [
                                    requestid,
                                    buyerid
                                ],
                                function (updateErr) {

                                    if (updateErr) {

                                        console.log(
                                            "Request Status Update Error:",
                                            updateErr
                                        );

                                        return res.send({

                                            status:
                                                "success",

                                            message:
                                                "Payment saved successfully, but request status could not be updated.",

                                            buyerpaymentid:
                                                result.insertId,

                                            transactionid:
                                                finalTransactionId

                                        });

                                    }


                                    console.log(
                                        "Purchase Request Status Updated To Paid"
                                    );


                                    // =================================================
                                    // SUCCESS RESPONSE
                                    // =================================================

                                    return res.send({

                                        status:
                                            "success",

                                        message:
                                            "Buyer payment saved successfully.",

                                        buyerpaymentid:
                                            result.insertId,

                                        transactionid:
                                            finalTransactionId

                                    });

                                }
                            );

                        }
                    );

                }
            );

        }
    );

});


module.exports = router;