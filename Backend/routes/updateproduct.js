var express = require('express');
var router = express.Router();

var mysql = require('mysql');

var con = mysql.createConnection({

    host:"localhost",
    user:"root",
    password:"",
    database:"agriconnectkerala"

});

router.post('/',function(req,res){

    let query=`

    UPDATE tblproduct SET

    categoryid='${req.body.categoryid}',
    productname='${req.body.productname}',
    quantity='${req.body.quantity}',
    unit='${req.body.unit}',
    quality='${req.body.quality}',
    expectedprice='${req.body.expectedprice}',
    image='${req.body.image}',
    description='${req.body.description}',
    districtid='${req.body.districtid}',
    locationid='${req.body.locationid}',
    status='${req.body.status}'

    WHERE productid='${req.body.productid}'

    `;

    console.log(query);

    con.query(query,function(err,result){

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