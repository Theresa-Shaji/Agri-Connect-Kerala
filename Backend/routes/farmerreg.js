var express = require('express');
var router = express.Router();

var mysql = require('mysql');
var transporter = require('./email');


// =====================================================
// DATABASE CONNECTION
// =====================================================

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "agriconnectkerala"
});


// =====================================================
// FARMER REGISTRATION
// =====================================================

router.post('/', function(req, res, next) {

    console.log("========================================");
    console.log("FARMER REGISTRATION");
    console.log("========================================");

    console.log("Name:", req.body.name);
    console.log("Email:", req.body.email);
    console.log("Username:", req.body.username);
    console.log("Phone:", req.body.phone);


    // =================================================
    // GET DATA
    // =================================================

    var username = req.body.username;
    var password = req.body.password;

    var name = req.body.name;
    var email = req.body.email;
    var phone = req.body.phone;

    var districtid = req.body.districtid;
    var locationid = req.body.locationid;

    var address = req.body.address;
    var regdate = req.body.regdate;
    var image = req.body.image;


    // =================================================
    // BASIC VALIDATION
    // =================================================

    if (
        !username ||
        !password ||
        !name ||
        !email ||
        !phone ||
        !districtid ||
        !locationid ||
        !address
    ) {

        return res.send({
            status: "failed",
            message: "All required fields are required."
        });

    }


    // =================================================
    // INSERT INTO LOGIN TABLE
    // =================================================

    var loginQuery = `

        INSERT INTO tbllogin
        (
            username,
            password,
            role,
            status
        )

        VALUES
        (
            ?,
            ?,
            'Farmer',
            'Accepted'
        )

    `;


    console.log("Inserting login details...");


    con.query(
        loginQuery,
        [
            username,
            password
        ],
        function(err, loginResult) {

            if (err) {

                console.log("Login Insert Error:");
                console.log(err);

                return res.send({
                    status: "failed",
                    message:
                        err.sqlMessage ||
                        "Unable to create login account."
                });

            }


            // =================================================
            // GET LOGIN ID
            // =================================================

            var loginid = loginResult.insertId;


            console.log(
                "Login Created. Login ID:",
                loginid
            );


            // =================================================
            // INSERT INTO FARMER TABLE
            // =================================================

            var farmerQuery = `

                INSERT INTO tblfarmer
                (
                    loginid,
                    name,
                    email,
                    phone,
                    districtid,
                    locationid,
                    address,
                    regdate,
                    status,
                    image
                )

                VALUES
                (
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    'Accepted',
                    ?
                )

            `;


            console.log(
                "Inserting farmer details..."
            );


            con.query(
                farmerQuery,
                [
                    loginid,
                    name,
                    email,
                    phone,
                    districtid,
                    locationid,
                    address,
                    regdate,
                    image
                ],
                function(err, result) {

                    if (err) {

                        console.log(
                            "Farmer Insert Error:"
                        );

                        console.log(err);


                        return res.send({
                            status: "failed",
                            message:
                                err.sqlMessage ||
                                "Unable to register farmer."
                        });

                    }


                    console.log(
                        "Farmer Registered Successfully."
                    );


                    // =================================================
                    // SEND EMAIL
                    // =================================================

                    var mailOptions = {

                        from: 'YOUR_GMAIL@gmail.com',

                        to: email,

                        subject:
                            'Welcome to Agri Connect Kerala - Registration Successful',

                        html: `

                            <div style="
                                font-family: Arial, sans-serif;
                                max-width: 600px;
                                margin: auto;
                                padding: 25px;
                                border: 1px solid #ddd;
                                border-radius: 10px;
                                background-color: #ffffff;
                            ">

                                <h2 style="
                                    color: #2e7d32;
                                    text-align: center;
                                ">
                                    🌱 Agri Connect Kerala
                                </h2>


                                <h3>
                                    Welcome ${name}!
                                </h3>


                                <p>
                                    Your farmer registration has been
                                    successfully completed.
                                </p>


                                <p>
                                    You can now login to your
                                    Agri Connect Kerala account using
                                    the credentials below.
                                </p>


                                <div style="
                                    background-color: #f5f5f5;
                                    padding: 15px;
                                    border-radius: 8px;
                                    margin: 20px 0;
                                ">

                                    <p>
                                        <strong>
                                            Username:
                                        </strong>

                                        ${username}
                                    </p>


                                    <p>
                                        <strong>
                                            Password:
                                        </strong>

                                        ${password}
                                    </p>

                                </div>


                                <p>
                                    Your account status is:
                                    <strong style="color: green;">
                                        Accepted
                                    </strong>
                                </p>


                                <p>
                                    Thank you for joining
                                    Agri Connect Kerala.
                                </p>


                                <hr>


                                <p style="
                                    font-size: 12px;
                                    color: #777;
                                    text-align: center;
                                ">
                                    This is an automated email.
                                    Please do not reply to this email.
                                </p>

                            </div>

                        `

                    };


                    transporter.sendMail(
                        mailOptions,
                        function(error, info) {

                            if (error) {

                                console.log(
                                    "Email Sending Failed:"
                                );

                                console.log(error);


                                // Registration is already successful.
                                // Therefore do NOT return failed registration.

                                return res.send({

                                    status: "success",

                                    message:
                                        "Farmer registered successfully, but email could not be sent.",

                                    emailStatus:
                                        "failed"

                                });

                            }


                            console.log(
                                "Email Sent Successfully"
                            );

                            console.log(
                                "Email Response:",
                                info.response
                            );


                            // =================================================
                            // FINAL RESPONSE
                            // =================================================

                            return res.send({

                                status: "success",

                                message:
                                    "Farmer registered successfully and login details sent to email.",

                                emailStatus:
                                    "sent"

                            });

                        }
                    );

                }
            );

        }
    );

});


module.exports = router;