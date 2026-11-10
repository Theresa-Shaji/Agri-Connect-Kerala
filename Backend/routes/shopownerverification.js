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
        l.locationname,
        lg.role,
        lg.status
    FROM tblshopowner s
    INNER JOIN tbllogin lg
        ON s.loginid = lg.loginid
    LEFT JOIN tbldistrict d
        ON d.districtid = s.districtid
    LEFT JOIN tbllocation l
        ON l.locationid = s.locationid
    WHERE lg.status = 'requested'
    AND lg.role = 'shopowner'
    `;

    console.log(query);

    con.query(query, (err, rows) => {
        if (err) {
            console.log(err);
            res.send([]);
        } else {
            console.log(rows);
            res.send(rows);
        }
    });

});

module.exports = router;