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
        console.log("Buyer Purchase Request Database Connection Failed");
        console.log(err);
    } else {
        console.log("Buyer Purchase Request Database Connected");
    }

});


// =====================================================
// GET PRODUCT DETAILS FOR PURCHASE REQUEST
// =====================================================

router.post('/requestproductdetails', function(req, res) {

    console.log("Request Product Details:", req.body);

    var productid = req.body.productid;

    var sql = `
        SELECT
            p.productid,
            p.productname,
            p.image,
            p.expectedprice,
            p.quantity,
            p.unit,
            p.farmerid,

            c.categoryname,

            f.name AS farmername,
            f.phone AS phoneno,

            d.districtname,

            l.locationname

        FROM tblproduct p

        INNER JOIN tblcategory c
            ON p.categoryid = c.categoryid

        INNER JOIN tblfarmer f
            ON p.farmerid = f.farmerid

        INNER JOIN tbldistrict d
            ON p.districtid = d.districtid

        INNER JOIN tbllocation l
            ON p.locationid = l.locationid

        WHERE p.productid = ?
    `;

    con.query(
        sql,
        [productid],
        function(err, result) {

            if (err) {

                console.log("Product Details Error:", err);

                return res.status(500).send({
                    status: "failed",
                    message: err.sqlMessage
                });

            }

            console.log(
                "Request Product Details Result:",
                result
            );

            res.send(result);
        }
    );

});


// =====================================================
// SEND BUYER PURCHASE REQUEST
// =====================================================

router.post('/sendpurchaserequest', function(req, res) {

    console.log(
        "Buyer Purchase Request Data:",
        req.body
    );

    var buyerid = req.body.buyerid;
    var farmerid = req.body.farmerid;
    var productid = req.body.productid;

    var quantity = Number(req.body.quantity);
    var offeredprice = Number(req.body.offeredprice);

    var message = req.body.message || "";

    var usertype = "Buyer";


    // =================================================
    // VALIDATION
    // =================================================

    if (
        !buyerid ||
        !farmerid ||
        !productid ||
        quantity <= 0 ||
        offeredprice <= 0
    ) {

        return res.status(400).send({
            status: "failed",
            message: "Please provide all required purchase details."
        });

    }


    // =================================================
    // CHECK BUYER
    // =================================================

    var buyerSql = `
        SELECT buyerid
        FROM tblbuyer
        WHERE buyerid = ?
    `;

    con.query(
        buyerSql,
        [buyerid],
        function(err, buyerResult) {

            if (err) {

                console.log("Buyer Check Error:", err);

                return res.status(500).send({
                    status: "failed",
                    message: err.sqlMessage
                });

            }


            if (buyerResult.length === 0) {

                return res.status(400).send({
                    status: "failed",
                    message: "Buyer not found."
                });

            }


            // =========================================
            // CHECK PRODUCT
            // =========================================

            var productSql = `
                SELECT
                    productid,
                    farmerid,
                    quantity
                FROM tblproduct
                WHERE productid = ?
            `;

            con.query(
                productSql,
                [productid],
                function(err, productResult) {

                    if (err) {

                        console.log(
                            "Product Check Error:",
                            err
                        );

                        return res.status(500).send({
                            status: "failed",
                            message: err.sqlMessage
                        });

                    }


                    if (productResult.length === 0) {

                        return res.status(400).send({
                            status: "failed",
                            message: "Product not found."
                        });

                    }


                    var product = productResult[0];


                    // =================================
                    // CHECK FARMER
                    // =================================

                    if (
                        Number(product.farmerid) !==
                        Number(farmerid)
                    ) {

                        return res.status(400).send({
                            status: "failed",
                            message:
                                "Invalid farmer for this product."
                        });

                    }


                    // =================================
                    // CHECK QUANTITY
                    // =================================

                    if (
                        quantity >
                        Number(product.quantity)
                    ) {

                        return res.status(400).send({
                            status: "failed",
                            message:
                                "Requested quantity is greater than available quantity."
                        });

                    }


                    // =================================
                    // INSERT PURCHASE REQUEST
                    // =================================

                    var insertSql = `
                        INSERT INTO tblpurchaserequest
                        (
                            buyerid,
                            usertype,
                            farmerid,
                            productid,
                            quantity,
                            offeredprice,
                            message,
                            requestdate,
                            status
                        )
                        VALUES
                        (
                            ?,
                            ?,
                            ?,
                            ?,
                            ?,
                            ?,
                            ?,
                            CURDATE(),
                            'Pending'
                        )
                    `;


                    var values = [
                        buyerid,
                        usertype,
                        farmerid,
                        productid,
                        quantity,
                        offeredprice,
                        message
                    ];


                    con.query(
                        insertSql,
                        values,
                        function(err, result) {

                            if (err) {

                                console.log(
                                    "Purchase Request Insert Error:",
                                    err
                                );

                                return res.status(500).send({
                                    status: "failed",
                                    message: err.sqlMessage
                                });

                            }


                            console.log(
                                "Purchase Request Created:",
                                result
                            );


                            res.send({

                                status: "success",

                                message:
                                    "Purchase request sent successfully.",

                                requestid:
                                    result.insertId

                            });

                        }
                    );

                }
            );

        }
    );

});


module.exports = router;