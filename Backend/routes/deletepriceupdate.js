var express = require('express');
var router = express.Router();

var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "agriconnectkerala"
});

router.post('/', function(req,res){

    var priceid = req.body.priceid;

    var sql = `
        DELETE FROM tblpriceupdate
        WHERE priceid = ?
    `;

    con.query(sql,[priceid],function(err,result){

        if(err)
        {
            console.log(err);
            res.send({
                message:"Failed"
            });
        }
        else
        {
            res.send({
                message:"Deleted"
            });
        }

    });

});

module.exports = router;