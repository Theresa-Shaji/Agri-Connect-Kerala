var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "agriconnectkerala"
});

router.post('/', (req, res) => {

    let priceid = req.body.priceid;

    let qry = `
        SELECT *
        FROM tblpriceupdate
        WHERE priceid='${priceid}'
    `;

    con.query(qry, (err, result) => {

        if(err)
        {
            console.log(err);
            res.send([]);
        }
        else
        {
            res.send(result);
        }

    });

});

module.exports = router;