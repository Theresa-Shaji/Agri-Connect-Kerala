module.exports = router;
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "agriconnectkerala"
});
/* GET users listing. */
router.post('/', function (req, res, next) {
    let category = req.body.categoryname;
    let image = req.body.image;

    let query = `SELECT * FROM tblcategory where categoryname='${category}';`;
    con.query(query, (err, rows) => {
        if (err) throw err;
        if (rows == "") {
            let strquery = `INSERT INTO tblcategory (categoryname,image)VALUES(?,?);`;
            con.query(strquery, [category, image])
            res.send({ message: 'Success' })
        }

        else {
            res.send({ message: 'Failed' })
        }
        // console.log("1 record inserted"); 
    });
});
module.exports = router;