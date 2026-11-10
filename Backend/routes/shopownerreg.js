const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const multer = require('multer');
const path = require('path');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "agriconnectkerala"
});

// Multer Storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

router.post('/',
    upload.fields([
        { name: 'image', maxCount: 1 },
        { name: 'licensedocument', maxCount: 1 }
    ]),
    (req, res) => {

        let shopname = req.body.shopname;
        let ownername = req.body.shopownername;
        let email = req.body.email;
        let phoneno = req.body.phone_number;
        let districtid = req.body.districtid;
        let locationid = req.body.locationid;
        let address = req.body.address;
        let licenseno = req.body.licenseno;

        let username = req.body.username;
        let password = req.body.password;

        let regdate = new Date();
        let role = "shopowner";
        let status = "requested";

        let image = "";
        let licensedocument = "";

        if (req.files['image']) {
            image = req.files['image'][0].filename;
        }

        if (req.files['licensedocument']) {
            licensedocument = req.files['licensedocument'][0].filename;
        }

        let checkQuery = `SELECT * FROM tbllogin WHERE username=?`;

        con.query(checkQuery, [username], (err, result) => {

            if (err) {
                console.log(err);
                return res.send({ message: "Error" });
            }

            if (result.length > 0) {

                return res.send({ message: "Failed" });

            } else {

                let loginQuery = `
                    INSERT INTO tbllogin
                    (username,password,role,status)
                    VALUES (?,?,?,?)
                `;

                con.query(
                    loginQuery,
                    [username, password, role, status],
                    (err, loginResult) => {

                        if (err) {
                            console.log(err);
                            return res.send({ message: "Error" });
                        }

                        let loginid = loginResult.insertId;

                        let shopQuery = `
                        INSERT INTO tblshopowner
                        (
                            loginid,
                            shopname,
                            ownername,
                            email,
                            phoneno,
                            districtid,
                            locationid,
                            address,
                            regdate,
                            status,
                            image,
                            licenseno,
                            licensedocument
                        )
                        VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)
                        `;

                        con.query(
                            shopQuery,
                            [
                                loginid,
                                shopname,
                                ownername,
                                email,
                                phoneno,
                                districtid,
                                locationid,
                                address,
                                regdate,
                                'pending',
                                image,
                                licenseno,
                                licensedocument
                            ],
                            (err, result) => {

                                if (err) {
                                    console.log(err);
                                    return res.send({ message: "Error" });
                                }

                                res.send({ message: "Success" });
                            }
                        );
                    }
                );
            }
        });
    }
);

module.exports = router;