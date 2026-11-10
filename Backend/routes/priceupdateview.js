var express = require('express');
var router = express.Router();

var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "agriconnectkerala"
});

con.connect(function(err){

    if(err)
    {
        console.log("Database connection failed");
        console.log(err);
    }
    else
    {
        console.log("Database connected");
    }

});


// View Shop Owner Price History

router.post('/history', function(req,res){

    var shopownerid = req.body.shopownerid;

    console.log("Shop Owner ID:", shopownerid);

    var sql = `

        SELECT

            p.priceid,
            p.shopownerid,
            p.categoryid,

            c.categoryname,
            c.image,

            p.price,
            p.unit,
            p.updatedate,
            p.trend

        FROM tblpriceupdate p

        INNER JOIN tblcategory c
        ON p.categoryid = c.categoryid

        WHERE p.shopownerid = ?

        ORDER BY p.updatedate DESC

    `;

    con.query(sql,[shopownerid],function(err,result){

        if(err)
        {
            console.log("Database Error:",err);

            res.status(500).send({
                message:"Database error"
            });
        }
        else
        {
            console.log("Price History:",result);

            res.send(result);
        }

    });

});

module.exports = router;