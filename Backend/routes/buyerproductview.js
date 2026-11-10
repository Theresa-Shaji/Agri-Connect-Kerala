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
        console.log("Buyer Product Database Connection Failed");
        console.log(err);
    } else {
        console.log("Buyer Product Database Connected");
    }

});


// ==========================================
// VIEW ALL FARMER PRODUCTS
// ==========================================

router.post('/viewproducts', function(req, res) {

    console.log("Buyer Product View Request:", req.body);

    var sql = `

        SELECT
            p.productid,
            p.productname,
            p.image,
            p.expectedprice,
            p.quantity,
            p.unit,

            p.farmerid,

            f.districtid,
            f.locationid,

            c.categoryname,

            f.name AS farmername,
            f.phone AS phoneno,

            d.districtname,
            l.locationname

        FROM tblproduct p

        INNER JOIN tblfarmer f
            ON p.farmerid = f.farmerid

        INNER JOIN tblcategory c
            ON p.categoryid = c.categoryid

        INNER JOIN tbldistrict d
            ON f.districtid = d.districtid

        INNER JOIN tbllocation l
            ON f.locationid = l.locationid

        ORDER BY p.productid DESC

    `;

    con.query(sql, function(err, result) {

        if (err) {

            console.log(err);

            return res.status(500).send(err);

        }

        console.log("Buyer Products:", result);

        res.send(result);

    });

});


// ==========================================
// VIEW SINGLE PRODUCT DETAILS
// ==========================================

router.post('/productdetails', function(req, res) {

    console.log("Buyer Product Details Request:", req.body);

    var productid = req.body.productid;

    if (!productid) {

        return res.status(400).send({
            message: "Product ID is required"
        });

    }


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
            l.locationname,

            f.address AS farmeraddress

        FROM tblproduct p

        INNER JOIN tblfarmer f
            ON p.farmerid = f.farmerid

        INNER JOIN tblcategory c
            ON p.categoryid = c.categoryid

        INNER JOIN tbldistrict d
            ON f.districtid = d.districtid

        INNER JOIN tbllocation l
            ON f.locationid = l.locationid

        WHERE p.productid = ?

    `;


    con.query(
        sql,
        [productid],
        function(err, result) {

            if (err) {

                console.log("Product Details Error:", err);

                return res.status(500).send(err);

            }

            console.log("Buyer Product Details:", result);

            res.send(result);

        }
    );

});


module.exports = router;