var express = require('express');
var router = express.Router();

var mysql = require('mysql');

// =====================================
// EMAIL
// =====================================

var transporter = require('./email');


// =====================================
// DATABASE CONNECTION
// =====================================

var con = mysql.createConnection({

    host: "localhost",
    user: "root",
    password: "",
    database: "agriconnectkerala"

});


con.connect(function(err) {

    if (err) {

        console.log("Buyer Database Connection Failed");
        console.log(err);

    }
    else {

        console.log("Buyer Database Connected");

    }

});


// =====================================
// BUYER REGISTRATION
// =====================================

router.post('/buyerreg', function(req, res) {

    console.log("=====================================");
    console.log("BUYER REGISTRATION");
    console.log("=====================================");


    // =====================================
    // GET DATA
    // =====================================

    var username = req.body.username;
    var password = req.body.password;

    var name = req.body.name;
    var email = req.body.email;
    var phone = req.body.phone;

    var districtid = req.body.districtid;
    var locationid = req.body.locationid;

    var address = req.body.address;


    console.log("Name :", name);
    console.log("Email :", email);
    console.log("Username :", username);
    console.log("Phone :", phone);


    // =====================================
    // VALIDATION
    // =====================================

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

        console.log(
            "Buyer Registration Failed - Missing Data"
        );


        return res.status(400).send({

            status: "failed",

            message:
                "Please fill all required fields."

        });

    }


    // =====================================
    // STEP 1
    // INSERT LOGIN DETAILS
    // =====================================

    var loginSql = `

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
            'Buyer',
            'Active'
        )

    `;


    console.log(
        "Inserting login details..."
    );


    con.query(

        loginSql,

        [
            username,
            password
        ],

        function(err, loginResult) {

            if (err) {

                console.log(
                    "Login Insert Error :",
                    err
                );


                // =====================================
                // DUPLICATE USERNAME
                // =====================================

                if (err.code === 'ER_DUP_ENTRY') {

                    return res.status(400).send({

                        status: "failed",

                        message:
                            "Username already exists."

                    });

                }


                return res.status(500).send({

                    status: "failed",

                    message:
                        err.sqlMessage ||
                        "Unable to create login account."

                });

            }


            // =====================================
            // LOGIN ID
            // =====================================

            var loginid =
                loginResult.insertId;


            console.log(
                "Generated Login ID :",
                loginid
            );


            // =====================================
            // STEP 2
            // INSERT BUYER DETAILS
            // =====================================

            var buyerSql = `

                INSERT INTO tblbuyer
                (
                    loginid,
                    name,
                    email,
                    phone,
                    districtid,
                    locationid,
                    address,
                    regdate,
                    status
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
                    CURDATE(),
                    'Active'
                )

            `;


            console.log(
                "Inserting buyer details..."
            );


            con.query(

                buyerSql,

                [
                    loginid,
                    name,
                    email,
                    phone,
                    districtid,
                    locationid,
                    address
                ],

                function(err, buyerResult) {

                    if (err) {

                        console.log(
                            "Buyer Insert Error :",
                            err
                        );


                        return res.status(500).send({

                            status: "failed",

                            message:
                                err.sqlMessage ||
                                "Unable to register buyer."

                        });

                    }


                    // =====================================
                    // BUYER REGISTERED SUCCESSFULLY
                    // =====================================

                    var buyerid =
                        buyerResult.insertId;


                    console.log(
                        "Buyer Registered Successfully"
                    );


                    console.log(
                        "Buyer ID :",
                        buyerid
                    );


                    console.log(
                        "Login ID :",
                        loginid
                    );


                    // =====================================
                    // STEP 3
                    // SEND EMAIL
                    // =====================================

                    var mailOptions = {

                        from:
                            'YOUR_GMAIL@gmail.com',

                        to:
                            email,

                        subject:
                            'Agri Connect Kerala - Registration Successful',

                        html: `

                            <div style="
                                font-family: Arial, sans-serif;
                                max-width: 600px;
                                margin: 30px auto;
                                padding: 25px;
                                border: 1px solid #ddd;
                                border-radius: 12px;
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

                                    Your buyer registration has been
                                    successfully completed.

                                </p>


                                <p>

                                    You can now login to your
                                    <strong>
                                        Agri Connect Kerala
                                    </strong>
                                    account using the credentials
                                    below.

                                </p>


                                <div style="
                                    background-color: #f5f5f5;
                                    padding: 18px;
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

                                    Account Status:

                                    <strong style="
                                        color: green;
                                    ">

                                        Active

                                    </strong>

                                </p>


                                <p>

                                    You can now login and use
                                    Agri Connect Kerala to browse
                                    agricultural products and send
                                    purchase requests to farmers.

                                </p>


                                <p>

                                    Thank you for joining
                                    <strong>
                                        Agri Connect Kerala
                                    </strong>.

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


                    // =====================================
                    // EMAIL LOG
                    // =====================================

                    console.log(
                        "Sending registration email to:",
                        email
                    );


                    // =====================================
                    // SEND EMAIL
                    // =====================================

                    transporter.sendMail(

                        mailOptions,

                        function(error, info) {

                            // =================================
                            // EMAIL FAILED
                            // =================================

                            if (error) {

                                console.log(
                                    "Buyer Email Sending Failed:"
                                );


                                console.log(error);


                                /*
                                 * Buyer registration already
                                 * succeeded.
                                 *
                                 * So we still return success.
                                 */

                                return res.send({

                                    status:
                                        "success",

                                    message:
                                        "Buyer registered successfully, but email could not be sent.",

                                    emailStatus:
                                        "failed",

                                    buyerid:
                                        buyerid,

                                    loginid:
                                        loginid

                                });

                            }


                            // =================================
                            // EMAIL SUCCESS
                            // =================================

                            console.log(
                                "Buyer Registration Email Sent Successfully"
                            );


                            console.log(
                                "Email Response:",
                                info.response
                            );


                            // =================================
                            // FINAL RESPONSE
                            // =================================

                            return res.send({

                                status:
                                    "success",

                                message:
                                    "Buyer Registration Successful and login details sent to email.",

                                emailStatus:
                                    "sent",

                                buyerid:
                                    buyerid,

                                loginid:
                                    loginid

                            });

                        }

                    );

                }

            );

        }

    );

});


// =====================================
// EXPORT ROUTER
// =====================================

module.exports = router;