var express = require('express');
var router = express.Router();
var mysql = require('mysql');


var con = mysql.createConnection({

    host:"localhost",
    user:"root",
    password:"",
    database:"agriconnectkerala"

});


//--------------------------------------------------
// View Shop Owner Categories
//--------------------------------------------------

router.post('/shopcategory',(req,res)=>{


    let shopownerid=req.body.shopownerid;


    let query=`

    SELECT 
        c.categoryid,
        c.categoryname

    FROM tblshopownercategory sc

    INNER JOIN tblcategory c

    ON sc.categoryid=c.categoryid

    WHERE sc.shopownerid=?

    `;


    con.query(query,[shopownerid],(err,result)=>{


        if(err)
        {
            console.log(err);
            res.send({
                status:"error"
            });
        }

        else
        {
            res.send(result);
        }


    });


});




//--------------------------------------------------
// Insert Price Update History
//--------------------------------------------------

router.post('/add',(req,res)=>{


    let shopownerid=req.body.shopownerid;

    let categoryid=req.body.categoryid;

    let price=req.body.price;

    let updatedate=req.body.updatedate;

    let unit=req.body.unit;

    let trend=req.body.trend;



    let query=`

    INSERT INTO tblpriceupdate

    (
        shopownerid,
        categoryid,
        price,
        updatedate,
        unit,
        trend
    )

    VALUES(?,?,?,?,?,?)

    `;



    con.query(query,

    [
        shopownerid,
        categoryid,
        price,
        updatedate,
        unit,
        trend
    ],

    (err,result)=>{


        if(err)
        {
            console.log(err);

            res.send({
                status:"error"
            });

        }

        else
        {
            res.send({
                status:"success"
            });
        }


    });


});



module.exports=router;