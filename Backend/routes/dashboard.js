var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "agriconnectkerala"
});

router.get('/', (req, res) => {

    let query = `
        SELECT

        (SELECT COUNT(*) 
         FROM tblfarmer) AS totalFarmers,

        (SELECT COUNT(*) 
         FROM tblbuyer) AS totalBuyers,

        (SELECT COUNT(*) 
         FROM tblshopowner) AS totalShopOwners,

        (SELECT COUNT(*) 
         FROM tblproduct) AS totalProducts,

        (SELECT COUNT(*) 
         FROM tblpurchaserequest) AS totalRequests,

        (SELECT COUNT(*)
         FROM tbllogin
         WHERE role = 'shopowner'
         AND status = 'requested') AS pendingShopOwners,

        (SELECT COUNT(*)
         FROM tblpurchaserequest
         WHERE status = 'pending') AS pendingRequests,

        (SELECT COUNT(*)
         FROM tblpurchaserequest
         WHERE status = 'accepted') AS acceptedRequests,

        (SELECT COUNT(*)
         FROM tblpurchaserequest
         WHERE status = 'rejected') AS rejectedRequests
    `;

    con.query(query, (err, rows) => {

        if (err) {

            console.log(err);

            return res.send({
                status: "error",
                message: "Failed to load dashboard data"
            });

        }

        console.log(rows);

        res.send({

            status: "success",

            totalFarmers: rows[0].totalFarmers,

            totalBuyers: rows[0].totalBuyers,

            totalShopOwners: rows[0].totalShopOwners,

            totalProducts: rows[0].totalProducts,

            totalRequests: rows[0].totalRequests,

            pendingShopOwners: rows[0].pendingShopOwners,

            pendingRequests: rows[0].pendingRequests,

            acceptedRequests: rows[0].acceptedRequests,

            rejectedRequests: rows[0].rejectedRequests

        });

    });

});

module.exports = router;