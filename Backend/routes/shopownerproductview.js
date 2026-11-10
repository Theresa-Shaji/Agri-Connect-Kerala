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



// View Farmer Products

router.post('/viewproducts', function(req,res){

  var sql = `

SELECT

    p.productid,
    p.farmerid,
    p.productname,
    p.quantity,
    p.unit,
    p.quality,
    p.expectedprice,
    p.image,
    p.description,
    p.uploaddate,
    p.status,

    f.name AS farmername,
    f.phone,

    c.categoryname,

    d.districtname,

    l.locationname


FROM tblproduct p


INNER JOIN tblfarmer f
ON p.farmerid = f.farmerid


INNER JOIN tblcategory c
ON p.categoryid = c.categoryid


INNER JOIN tbldistrict d
ON p.districtid = d.districtid


INNER JOIN tbllocation l
ON p.locationid = l.locationid


WHERE p.status='Available'


ORDER BY p.uploaddate DESC

`;

    con.query(sql,function(err,result){

        if(err)
        {
            console.log("Database Error:",err);

            res.status(500).send({
                message:"Database error"
            });

        }
        else
        {
            console.log("Farmer Products:",result);

            res.send(result);
        }

    });


});


module.exports = router;