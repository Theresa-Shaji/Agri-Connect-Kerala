var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "agriconnectkerala"
});

router.get('/', (req, res, next) => {

    let query = `
        SELECT
            s.*,
            d.districtname,
            l.locationname
        FROM tblshopowner s
        INNER JOIN tbldistrict d
            ON s.districtid = d.districtid
        INNER JOIN tbllocation l
            ON s.locationid = l.locationid
        INNER JOIN tbllogin lg
            ON s.loginid = lg.loginid
        WHERE lg.status = 'Accepted'
    `;

    console.log(query);

    con.query(query, (err, rows) => {
        if (err) throw err;
        res.send(rows);
    });

});

module.exports = router;