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

    let query = `
        UPDATE tbllogin
        SET status='Suspended'
        WHERE loginid='${loginid}'
    `;

    console.log(query);

    con.query(query, (err, rows) => {

        if (err)
            throw err;

        res.send({ message: 'Success' });

    });

});

module.exports = router;