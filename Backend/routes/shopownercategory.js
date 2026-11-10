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

    let shopownerid = req.body.shopownerid;
    let categoryid = req.body.categoryid;

    let checkQry = `
        SELECT *
        FROM tblshopownercategory
        WHERE shopownerid='${shopownerid}'
        AND categoryid='${categoryid}'
    `;

    con.query(checkQry, (err, rows) => {

        if (err) {
            console.log(err);
            res.send("Failed");
        }
        else if (rows.length > 0) {

            res.send("Already Added");

        }
        else {

            let data = {
                shopownerid: shopownerid,
                categoryid: categoryid
            };

            let insertQry = "INSERT INTO tblshopownercategory SET ?";

            con.query(insertQry, data, (err, result) => {

                if (err) {
                    console.log(err);
                    res.send("Failed");
                }
                else {
                    res.send("Success");
                }

            });
        }

    });

});

module.exports = router;