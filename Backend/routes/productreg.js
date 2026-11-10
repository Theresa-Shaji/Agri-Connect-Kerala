var express = require('express');
var router = express.Router();

var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "agriconnectkerala"
});

router.post('/', function(req, res, next) {

    let query = `
    INSERT INTO tblproduct
    (
        farmerid,
        categoryid,
        productname,
        quantity,
        unit,
        quality,
        expectedprice,
        image,
        description,
        uploaddate,
        districtid,
        locationid,
        status
    )
    VALUES
    (
        '${req.body.farmerid}',
        '${req.body.categoryid}',
        '${req.body.productname}',
        '${req.body.quantity}',
        '${req.body.unit}',
        '${req.body.quality}',
        '${req.body.expectedprice}',
        '${req.body.image}',
        '${req.body.description}',
        '${req.body.uploaddate}',
        '${req.body.districtid}',
        '${req.body.locationid}',
        '${req.body.status}'
    )
    `;

    console.log(query);

    con.query(query, function(err, result) {

        if (err) {

            console.log(err);

            return res.send({
                status: "failed"
            });

        }

        res.send({
            status: "success"
        });

    });

});

module.exports = router;