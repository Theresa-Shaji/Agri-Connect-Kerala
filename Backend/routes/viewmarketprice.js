var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "agriconnectkerala"
});


// =====================================================
// GET DISTRICTS
// =====================================================

router.get('/district', (req, res) => {

    let query = `
        SELECT *
        FROM tbldistrict
        ORDER BY districtname
    `;

    con.query(query, (err, rows) => {

        if (err) {

            console.log(err);

            res.status(500).send(err);

            return;
        }

        res.send(rows);

    });

});


// =====================================================
// GET LOCATIONS
// =====================================================

router.get('/location/:id', (req, res) => {

    let districtid = req.params.id;

    let query;
    let values = [];


    // -----------------------------------------------
    // ALL LOCATIONS
    // -----------------------------------------------

    if (districtid === 'all') {

        query = `
            SELECT *
            FROM tbllocation
            ORDER BY locationname
        `;

    }

    // -----------------------------------------------
    // LOCATIONS OF SELECTED DISTRICT
    // -----------------------------------------------

    else {

        query = `
            SELECT *
            FROM tbllocation
            WHERE districtid = ?
            ORDER BY locationname
        `;

        values = [districtid];

    }


    con.query(query, values, (err, rows) => {

        if (err) {

            console.log(err);

            res.status(500).send(err);

            return;
        }

        res.send(rows);

    });

});


// =====================================================
// GET CATEGORY
// =====================================================

router.get('/category', (req, res) => {

    let query = `
        SELECT *
        FROM tblcategory
        ORDER BY categoryname
    `;

    con.query(query, (err, rows) => {

        if (err) {

            console.log(err);

            res.status(500).send(err);

            return;
        }

        res.send(rows);

    });

});


// =====================================================
// SEARCH / VIEW MARKET PRICE
// =====================================================

router.post('/search', (req, res) => {

    let districtid = req.body.districtid;

    let locationid = req.body.locationid;

    let categoryid = req.body.categoryid;


    console.log("Market Price Filters:");

    console.log("District:", districtid);

    console.log("Location:", locationid);

    console.log("Category:", categoryid);


    // =================================================
    // BASE QUERY
    // =================================================

    let query = `

        SELECT

            d.districtname,

            l.locationname,

            s.shopname,

            s.ownername,

            s.phoneno,

            c.categoryname,

            p.price,

            p.unit,

            p.updatedate,

            p.trend

        FROM tblpriceupdate p


        INNER JOIN tblshopowner s

            ON p.shopownerid = s.shopownerid


        INNER JOIN tbldistrict d

            ON s.districtid = d.districtid


        INNER JOIN tbllocation l

            ON s.locationid = l.locationid


        INNER JOIN tblcategory c

            ON p.categoryid = c.categoryid


        WHERE s.status = 'Accepted'

    `;


    let values = [];


    // =================================================
    // DISTRICT FILTER
    // =================================================

    if (districtid && districtid !== "") {

        query += `
            AND s.districtid = ?
        `;

        values.push(districtid);

    }


    // =================================================
    // LOCATION FILTER
    // =================================================

    if (locationid && locationid !== "") {

        query += `
            AND s.locationid = ?
        `;

        values.push(locationid);

    }


    // =================================================
    // CATEGORY FILTER
    // =================================================

    if (categoryid && categoryid !== "") {

        query += `
            AND p.categoryid = ?
        `;

        values.push(categoryid);

    }


    // =================================================
    // ORDER BY
    // =================================================

    query += `

        ORDER BY
            p.updatedate DESC,
            d.districtname,
            l.locationname,
            c.categoryname

    `;


    console.log("Final Query:");

    console.log(query);

    console.log("Values:");

    console.log(values);


    // =================================================
    // EXECUTE QUERY
    // =================================================

    con.query(
        query,
        values,
        (err, rows) => {

            if (err) {

                console.log(
                    "Market Price Error:",
                    err
                );

                res.status(500).send(err);

                return;
            }


            console.log(
                "Market Price Rows:",
                rows.length
            );


            res.send(rows);

        }
    );

});


module.exports = router;