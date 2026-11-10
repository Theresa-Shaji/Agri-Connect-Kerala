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

        console.log("Feedback Database Connection Failed");
        console.log(err);

    }
    else {

        console.log("Feedback Database Connected");

    }

});


// =====================================================
// =====================================================
// BUYER FEEDBACK
// =====================================================
// =====================================================


// =====================================================
// BUYER
// GET PAID PURCHASES WAITING FOR FEEDBACK
// =====================================================

router.post('/getfeedbackrequests', function(req, res) {

    var buyerid = req.body.buyerid;

    console.log("========================================");
    console.log("GET BUYER FEEDBACK REQUESTS");
    console.log("Buyer ID:", buyerid);
    console.log("========================================");


    if (!buyerid) {

        return res.status(400).send({

            status: "failed",
            message: "Buyer ID is required."

        });

    }


    var sql = `

        SELECT DISTINCT

            pr.requestid,
            pr.buyerid,
            pr.usertype,
            pr.farmerid,
            pr.productid,
            pr.quantity AS requestquantity,
            pr.offeredprice,
            pr.requestdate,
            pr.status,

            p.productname,
            p.image,

            CASE
                WHEN p.unit IS NULL
                OR p.unit = ''
                THEN 'Kg'
                ELSE p.unit
            END AS unit,

            f.name AS farmername

        FROM tblpurchaserequest pr

        INNER JOIN tblproduct p
            ON pr.productid = p.productid

        INNER JOIN tblfarmer f
            ON pr.farmerid = f.farmerid

        INNER JOIN tblbuyerpayment bp
            ON pr.requestid = bp.requestid

        LEFT JOIN tblfeedback fb
            ON pr.requestid = fb.requestid
            AND fb.buyerid = ?
            AND fb.fromusertype = 'Buyer'

        WHERE pr.buyerid = ?

        AND pr.usertype = 'Buyer'

        AND bp.paymentstatus = 'Paid'

        AND fb.feedbackid IS NULL

        ORDER BY pr.requestdate DESC

    `;


    con.query(
        sql,
        [
            buyerid,
            buyerid
        ],
        function(err, result) {

            if (err) {

                console.log(
                    "Get Buyer Feedback Requests Error:",
                    err
                );

                return res.status(500).send({

                    status: "failed",

                    message:
                        err.sqlMessage ||
                        "Unable to load buyer feedback requests."

                });

            }


            console.log(
                "Number of Buyer Feedback Requests:",
                result.length
            );


            res.send({

                status: "success",
                data: result

            });

        }
    );

});


// =====================================================
// BUYER
// SAVE FEEDBACK
// =====================================================

router.post('/savefeedback', function(req, res) {

    var requestid = req.body.requestid;
    var buyerid = req.body.buyerid;
    var farmerid = req.body.farmerid;
    var productid = req.body.productid;
    var rating = req.body.rating;
    var feedback = req.body.feedback;


    console.log("========================================");
    console.log("SAVE BUYER FEEDBACK");
    console.log("Request ID:", requestid);
    console.log("Buyer ID:", buyerid);
    console.log("Farmer ID:", farmerid);
    console.log("Product ID:", productid);
    console.log("Rating:", rating);
    console.log("========================================");


    if (
        !requestid ||
        !buyerid ||
        !farmerid ||
        !productid ||
        !rating ||
        !feedback
    ) {

        return res.status(400).send({

            status: "failed",
            message: "All buyer feedback details are required."

        });

    }


    if (
        Number(rating) < 1 ||
        Number(rating) > 5
    ) {

        return res.status(400).send({

            status: "failed",
            message: "Rating must be between 1 and 5."

        });

    }


    feedback = feedback.trim();


    if (feedback.length === 0) {

        return res.status(400).send({

            status: "failed",
            message: "Feedback cannot be empty."

        });

    }


    // =================================================
    // VERIFY BUYER PAID PURCHASE
    // =================================================

    var checkSql = `

        SELECT pr.requestid

        FROM tblpurchaserequest pr

        INNER JOIN tblbuyerpayment bp
            ON pr.requestid = bp.requestid

        WHERE pr.requestid = ?

        AND pr.buyerid = ?

        AND pr.usertype = 'Buyer'

        AND pr.farmerid = ?

        AND pr.productid = ?

        AND bp.paymentstatus = 'Paid'

        LIMIT 1

    `;


    con.query(
        checkSql,
        [
            requestid,
            buyerid,
            farmerid,
            productid
        ],
        function(err, result) {

            if (err) {

                console.log(err);

                return res.status(500).send({

                    status: "failed",
                    message: err.sqlMessage

                });

            }


            if (result.length === 0) {

                return res.status(400).send({

                    status: "failed",

                    message:
                        "Paid buyer purchase not found."

                });

            }


            // =================================================
            // DUPLICATE CHECK
            // =================================================

            var duplicateSql = `

                SELECT feedbackid

                FROM tblfeedback

                WHERE requestid = ?

                AND buyerid = ?

                AND fromusertype = 'Buyer'

                LIMIT 1

            `;


            con.query(
                duplicateSql,
                [
                    requestid,
                    buyerid
                ],
                function(err, feedbackResult) {

                    if (err) {

                        return res.status(500).send({

                            status: "failed",
                            message: err.sqlMessage

                        });

                    }


                    if (feedbackResult.length > 0) {

                        return res.status(400).send({

                            status: "failed",

                            message:
                                "Buyer feedback has already been submitted."

                        });

                    }


                    // =================================================
                    // INSERT BUYER FEEDBACK
                    // =================================================

                    var insertSql = `

                        INSERT INTO tblfeedback
                        (
                            requestid,
                            farmerid,
                            productid,
                            rating,
                            feedback,
                            feedbackdate,
                            buyerid,
                            shopownerid,
                            fromusertype
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
                            NULL,
                            'Buyer'
                        )

                    `;


                    con.query(
                        insertSql,
                        [
                            requestid,
                            farmerid,
                            productid,
                            rating,
                            feedback,
                            buyerid
                        ],
                        function(err, result) {

                            if (err) {

                                console.log(err);

                                return res.status(500).send({

                                    status: "failed",
                                    message: err.sqlMessage

                                });

                            }


                            res.send({

                                status: "success",

                                message:
                                    "Buyer feedback submitted successfully.",

                                feedbackid:
                                    result.insertId

                            });

                        }
                    );

                }
            );

        }
    );

});


// =====================================================
// =====================================================
// SHOP OWNER FEEDBACK
// =====================================================
// =====================================================


// =====================================================
// SHOP OWNER
// GET PAID PURCHASES WAITING FOR FEEDBACK
// =====================================================

router.post('/getshopownerfeedbackrequests', function(req, res) {

    var shopownerid = req.body.shopownerid;


    console.log("========================================");
    console.log("GET SHOP OWNER FEEDBACK REQUESTS");
    console.log("Shop Owner ID:", shopownerid);
    console.log("========================================");


    if (!shopownerid) {

        return res.status(400).send({

            status: "failed",
            message: "Shop Owner ID is required."

        });

    }


    /*
        IMPORTANT:

        Shop Owner requests are identified by:

        pr.buyerid = shopownerid

        AND

        pr.usertype = 'ShopOwner'

        Payment comes from:

        tblpayment

        NOT tblbuyerpayment.
    */


    var sql = `

        SELECT DISTINCT

            pr.requestid,

            pr.buyerid,

            pr.usertype,

            pr.farmerid,

            pr.productid,

            pr.quantity AS requestquantity,

            pr.offeredprice,

            pr.requestdate,

            pr.status,

            p.productname,

            p.image,

            CASE
                WHEN p.unit IS NULL
                OR p.unit = ''
                THEN 'Kg'
                ELSE p.unit
            END AS unit,

            f.name AS farmername,

            f.phone AS phoneno

        FROM tblpurchaserequest pr


        INNER JOIN tblproduct p
            ON pr.productid = p.productid


        INNER JOIN tblfarmer f
            ON pr.farmerid = f.farmerid


        INNER JOIN tblpayment pay
            ON pr.requestid = pay.requestid


        LEFT JOIN tblfeedback fb
            ON pr.requestid = fb.requestid

            AND fb.shopownerid = ?

            AND fb.fromusertype = 'ShopOwner'


        WHERE pr.buyerid = ?

        AND pr.usertype = 'ShopOwner'

        AND pay.paymentstatus = 'Paid'

        AND fb.feedbackid IS NULL


        ORDER BY pr.requestdate DESC

    `;


    con.query(
        sql,
        [
            shopownerid,
            shopownerid
        ],
        function(err, result) {

            if (err) {

                console.log(
                    "Get Shop Owner Feedback Requests Error:",
                    err
                );


                return res.status(500).send({

                    status: "failed",

                    message:
                        err.sqlMessage ||
                        "Unable to load shop owner feedback requests."

                });

            }


            console.log(
                "Number of Shop Owner Feedback Requests:",
                result.length
            );


            result.forEach(function(item) {

                console.log("--------------------------------");

                console.log(
                    "Request ID:",
                    item.requestid
                );

                console.log(
                    "Shop Owner ID:",
                    item.buyerid
                );

                console.log(
                    "User Type:",
                    item.usertype
                );

                console.log(
                    "Farmer ID:",
                    item.farmerid
                );

                console.log(
                    "Product:",
                    item.productname
                );

            });


            res.send({

                status: "success",
                data: result

            });

        }
    );

});


// =====================================================
// SHOP OWNER
// SAVE FEEDBACK TO FARMER
// =====================================================

router.post('/saveshopownerfeedback', function(req, res) {

    var requestid = req.body.requestid;
    var shopownerid = req.body.shopownerid;
    var farmerid = req.body.farmerid;
    var productid = req.body.productid;
    var rating = req.body.rating;
    var feedback = req.body.feedback;


    console.log("========================================");
    console.log("SAVE SHOP OWNER FEEDBACK");
    console.log("Request ID:", requestid);
    console.log("Shop Owner ID:", shopownerid);
    console.log("Farmer ID:", farmerid);
    console.log("Product ID:", productid);
    console.log("Rating:", rating);
    console.log("Feedback:", feedback);
    console.log("========================================");


    if (
        !requestid ||
        !shopownerid ||
        !farmerid ||
        !productid ||
        !rating ||
        !feedback
    ) {

        return res.status(400).send({

            status: "failed",

            message:
                "All shop owner feedback details are required."

        });

    }


    if (
        Number(rating) < 1 ||
        Number(rating) > 5
    ) {

        return res.status(400).send({

            status: "failed",

            message: "Rating must be between 1 and 5."

        });

    }


    feedback = feedback.trim();


    if (feedback.length === 0) {

        return res.status(400).send({

            status: "failed",

            message: "Feedback cannot be empty."

        });

    }


    // =================================================
    // VERIFY SHOP OWNER PAID PURCHASE
    // =================================================

    var checkRequestSql = `

        SELECT

            pr.requestid

        FROM tblpurchaserequest pr


        INNER JOIN tblpayment pay

            ON pr.requestid = pay.requestid


        WHERE pr.requestid = ?

        AND pr.buyerid = ?

        AND pr.usertype = 'ShopOwner'

        AND pr.farmerid = ?

        AND pr.productid = ?

        AND pay.paymentstatus = 'Paid'

        LIMIT 1

    `;


    con.query(
        checkRequestSql,
        [
            requestid,
            shopownerid,
            farmerid,
            productid
        ],
        function(err, result) {

            if (err) {

                console.log(
                    "Shop Owner Paid Purchase Check Error:",
                    err
                );


                return res.status(500).send({

                    status: "failed",

                    message:
                        err.sqlMessage ||
                        "Unable to verify shop owner payment."

                });

            }


            if (result.length === 0) {

                return res.status(400).send({

                    status: "failed",

                    message:
                        "Paid shop owner purchase not found. Feedback can be submitted only after payment."

                });

            }


            // =================================================
            // CHECK DUPLICATE SHOP OWNER FEEDBACK
            // =================================================

            var duplicateSql = `

                SELECT feedbackid

                FROM tblfeedback

                WHERE requestid = ?

                AND shopownerid = ?

                AND fromusertype = 'ShopOwner'

                LIMIT 1

            `;


            con.query(
                duplicateSql,
                [
                    requestid,
                    shopownerid
                ],
                function(err, feedbackResult) {

                    if (err) {

                        console.log(err);

                        return res.status(500).send({

                            status: "failed",

                            message:
                                err.sqlMessage ||
                                "Unable to check existing feedback."

                        });

                    }


                    if (feedbackResult.length > 0) {

                        return res.status(400).send({

                            status: "failed",

                            message:
                                "Shop Owner feedback has already been submitted."

                        });

                    }


                    // =================================================
                    // INSERT SHOP OWNER FEEDBACK
                    // =================================================

                    var insertSql = `

                        INSERT INTO tblfeedback
                        (
                            requestid,
                            farmerid,
                            productid,
                            rating,
                            feedback,
                            feedbackdate,
                            buyerid,
                            shopownerid,
                            fromusertype
                        )

                        VALUES
                        (
                            ?,
                            ?,
                            ?,
                            ?,
                            ?,
                            CURDATE(),
                            NULL,
                            ?,
                            'ShopOwner'
                        )

                    `;


                    con.query(
                        insertSql,
                        [
                            requestid,
                            farmerid,
                            productid,
                            rating,
                            feedback,
                            shopownerid
                        ],
                        function(err, result) {

                            if (err) {

                                console.log(
                                    "Save Shop Owner Feedback Error:",
                                    err
                                );


                                return res.status(500).send({

                                    status: "failed",

                                    message:
                                        err.sqlMessage ||
                                        "Unable to save shop owner feedback."

                                });

                            }


                            console.log(
                                "Shop Owner Feedback Saved Successfully"
                            );


                            console.log(
                                "Feedback ID:",
                                result.insertId
                            );


                            res.send({

                                status: "success",

                                message:
                                    "Shop Owner feedback submitted successfully.",

                                feedbackid:
                                    result.insertId

                            });

                        }
                    );

                }
            );

        }
    );

});


// =====================================================
// =====================================================
// FARMER - VIEW CUSTOMER FEEDBACK
// =====================================================
// =====================================================

router.post('/getfarmerfeedback', function(req, res) {

    var farmerid = req.body.farmerid;


    if (!farmerid) {

        return res.status(400).send({

            status: "failed",
            message: "Farmer ID is required."

        });

    }


    var sql = `

        SELECT

            fb.feedbackid,
            fb.requestid,
            fb.farmerid,
            fb.productid,
            fb.rating,
            fb.feedback,
            fb.feedbackdate,
            fb.buyerid,
            fb.shopownerid,
            fb.fromusertype,

            p.productname,
            p.image,

            CASE
                WHEN p.unit IS NULL
                OR p.unit = ''
                THEN 'Kg'
                ELSE p.unit
            END AS unit,

            pr.quantity,
            pr.offeredprice AS price,

            b.name AS buyername,
            b.phone AS buyerphone,

            so.shopname,
            so.ownername,
            so.phoneno AS shopownerphone

        FROM tblfeedback fb


        INNER JOIN tblproduct p
            ON fb.productid = p.productid


        INNER JOIN tblpurchaserequest pr
            ON fb.requestid = pr.requestid


        LEFT JOIN tblbuyer b
            ON fb.fromusertype = 'Buyer'
            AND fb.buyerid = b.buyerid


        LEFT JOIN tblshopowner so
            ON fb.fromusertype = 'ShopOwner'
            AND fb.shopownerid = so.shopownerid


        WHERE fb.farmerid = ?


        ORDER BY fb.feedbackdate DESC

    `;


    con.query(
        sql,
        [farmerid],
        function(err, result) {

            if (err) {

                console.log(
                    "Get Farmer Feedback Error:",
                    err
                );


                return res.status(500).send({

                    status: "failed",

                    message:
                        err.sqlMessage ||
                        "Unable to load farmer feedback."

                });

            }


            res.send({

                status: "success",
                data: result

            });

        }
    );

});


// =====================================================
// PRODUCT FEEDBACK
// =====================================================

router.post('/getproductfeedback', function(req, res) {

    var productid = req.body.productid;


    if (!productid) {

        return res.status(400).send({

            status: "failed",
            message: "Product ID is required."

        });

    }


    var sql = `

        SELECT

            fb.feedbackid,
            fb.requestid,
            fb.farmerid,
            fb.productid,
            fb.rating,
            fb.feedback,
            fb.feedbackdate,
            fb.buyerid,
            fb.shopownerid,
            fb.fromusertype,

            p.productname,
            p.image,

            CASE
                WHEN p.unit IS NULL
                OR p.unit = ''
                THEN 'Kg'
                ELSE p.unit
            END AS unit,

            pr.quantity,
            pr.offeredprice AS price,

            b.name AS buyername,
            b.phone AS buyerphone,

            so.shopname,
            so.ownername,
            so.phoneno AS shopownerphone

        FROM tblfeedback fb


        INNER JOIN tblproduct p
            ON fb.productid = p.productid


        INNER JOIN tblpurchaserequest pr
            ON fb.requestid = pr.requestid


        LEFT JOIN tblbuyer b
            ON fb.fromusertype = 'Buyer'
            AND fb.buyerid = b.buyerid


        LEFT JOIN tblshopowner so
            ON fb.fromusertype = 'ShopOwner'
            AND fb.shopownerid = so.shopownerid


        WHERE fb.productid = ?


        ORDER BY fb.feedbackdate DESC

    `;


    con.query(
        sql,
        [productid],
        function(err, result) {

            if (err) {

                console.log(
                    "Get Product Feedback Error:",
                    err
                );


                return res.status(500).send({

                    status: "failed",

                    message:
                        err.sqlMessage ||
                        "Unable to load product feedback."

                });

            }


            res.send({

                status: "success",
                data: result

            });

        }
    );

});


// =====================================================
// EXPORT
// =====================================================

module.exports = router;