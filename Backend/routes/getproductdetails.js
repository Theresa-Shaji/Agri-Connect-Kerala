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
        console.log("Database Connection Failed");
        console.log(err);
    } else {
        console.log("Buyer Product Details Database Connected");
    }
});


router.post('/', function(req, res) {

    // Frontend sends productid
    let productid = req.body.productid;

    console.log("Product ID received:", productid);

    if (!productid) {

        return res.status(400).send({
            status: "failed",
            message: "Product ID is required."
        });

    }


    let query = `
        SELECT *
        FROM tblproduct
        WHERE productid = ?
    `;


    console.log("Product Details Query:", query);


    con.query(
        query,
        [productid],
        function(err, rows) {

            if (err) {

                console.log("Get Product Details Error:", err);

                return res.status(500).send({
                    status: "failed",
                    message: err.sqlMessage || "Unable to get product details."
                });

            }


            console.log("Product Details Result:", rows);


            if (rows.length === 0) {

                return res.send([]);

            }


            res.send(rows);

        }
    );

});


module.exports = router;