var mysql = require('mysql');
var express = require('express');
var router = express.Router();

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "agriconnectkerala"
});

router.post('/', (req, res, next) => {

    let username = req.body.username;
    let password = req.body.password;

    let strquery = `
        SELECT
            l.*,
            s.shopownerid,
            f.farmerid,
            b.buyerid
        FROM tbllogin l

        LEFT JOIN tblshopowner s
        ON l.loginid = s.loginid

        LEFT JOIN tblfarmer f
        ON l.loginid = f.loginid

        LEFT JOIN tblbuyer b
        ON l.loginid = b.loginid

        WHERE l.username='${username}'
        AND l.password='${password}'
    `;

    console.log(strquery);

    con.query(strquery, (err, result) => {

        if (err) {

            console.log(err);
            return res.send([]);

        }

        console.log(result);

        res.send(result);

    });

});

module.exports = router;