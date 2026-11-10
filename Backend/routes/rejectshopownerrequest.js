var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "agriconnectkerala"
});

router.post('/', (req, res, next) => {

    let loginid = req.body.loginid;

    let strquery = `
        UPDATE tbllogin
        SET status='Rejected'
        WHERE loginid='${loginid}'
    `;

    console.log(strquery);

    con.query(strquery, (err, rows) => {

        if (err)
            throw err;

        res.send({
            message: 'Success'
        });

    });

});

module.exports = router;