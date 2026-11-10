var express = require('express');
var router = express.Router();

var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "agriconnectkerala"
});

router.post('/', function(req, res) {

    let productid = req.body.productid;

    let query = `
    DELETE FROM tblproduct
    WHERE productid='${productid}'
    `;

    console.log(query);

    con.query(query, function(err, result) {

        if(err){

            console.log(err);

            res.send({
                status:"failed"
            });

        }
        else{

            res.send({
                status:"success"
            });

        }

    });

});

module.exports = router;