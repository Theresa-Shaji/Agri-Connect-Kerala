var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var con = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"agriconnectkerala"
});


router.post('/',(req,res)=>{

    let priceid = req.body.priceid;
    let categoryid = req.body.categoryid;
    let price = req.body.price;
    let updatedate = req.body.updatedate;
    let unit = req.body.unit;
    let trend = req.body.trend;


    let query = `
    UPDATE tblpriceupdate
    SET
    categoryid=?,
    price=?,
    updatedate=?,
    unit=?,
    trend=?
    WHERE priceid=?
    `;


    con.query(query,
    [
        categoryid,
        price,
        updatedate,
        unit,
        trend,
        priceid
    ],
    (err,result)=>{

        if(err)
        {
            console.log(err);
            res.send({status:"error"});
        }
        else
        {
            res.send({status:"success"});
        }

    });


});


module.exports=router;