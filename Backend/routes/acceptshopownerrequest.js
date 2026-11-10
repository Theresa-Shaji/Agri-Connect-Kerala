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

        console.log("Shop Owner Accept Database Connection Failed");
        console.log(err);

    }
    else {

        console.log("Shop Owner Accept Database Connected");

    }

});


// =====================================
// ACCEPT SHOP OWNER
// =====================================

router.post('/', function(req, res) {

    console.log("========================================");
    console.log("ACCEPT SHOP OWNER REQUEST");
    console.log("========================================");


    var loginid = req.body.loginid;


    console.log("Login ID :", loginid);


    // =====================================
    // VALIDATE LOGIN ID
    // =====================================

    if (!loginid) {

        return res.status(400).send({

            status: "failed",

            message:
                "Login ID is required."

        });

    }


    // =====================================
    // STEP 1
    // GET SHOP OWNER + LOGIN DETAILS
    // =====================================

    var getDetailsSql = `

        SELECT

            so.shopownerid,
            so.loginid,
            so.shopname,
            so.ownername,
            so.email,
            so.phoneno,

            l.username,
            l.password

        FROM tblshopowner so

        INNER JOIN tbllogin l
            ON so.loginid = l.loginid

        WHERE so.loginid = ?

    `;


    con.query(

        getDetailsSql,

        [loginid],

        function(err, result) {

            if (err) {

                console.log(
                    "Get Shop Owner Details Error :",
                    err
                );


                return res.status(500).send({

                    status: "failed",

                    message:
                        err.sqlMessage ||
                        "Unable to get shop owner details."

                });

            }


            // =====================================
            // SHOP OWNER NOT FOUND
            // =====================================

            if (result.length === 0) {

                return res.status(404).send({

                    status: "failed",

                    message:
                        "Shop owner not found."

                });

            }


            var shopowner = result[0];


            console.log(
                "Shop Owner ID :",
                shopowner.shopownerid
            );

            console.log(
                "Shop Name :",
                shopowner.shopname
            );

            console.log(
                "Owner Name :",
                shopowner.ownername
            );

            console.log(
                "Email :",
                shopowner.email
            );

            console.log(
                "Username :",
                shopowner.username
            );


            // =====================================
            // STEP 2
            // UPDATE LOGIN STATUS
            // =====================================

            var loginUpdateSql = `

                UPDATE tbllogin

                SET status = 'Accepted'

                WHERE loginid = ?

            `;


            con.query(

                loginUpdateSql,

                [loginid],

                function(err, loginUpdateResult) {

                    if (err) {

                        console.log(
                            "Login Status Update Error :",
                            err
                        );


                        return res.status(500).send({

                            status: "failed",

                            message:
                                err.sqlMessage ||
                                "Unable to accept shop owner."

                        });

                    }


                    console.log(
                        "Login Status Updated Successfully"
                    );


                    // =====================================
                    // STEP 3
                    // UPDATE SHOP OWNER STATUS
                    // =====================================

                    var shopownerUpdateSql = `

                        UPDATE tblshopowner

                        SET status = 'Accepted'

                        WHERE loginid = ?

                    `;


                    con.query(

                        shopownerUpdateSql,

                        [loginid],

                        function(err, shopownerUpdateResult) {

                            if (err) {

                                console.log(
                                    "Shop Owner Status Update Error :",
                                    err
                                );


                                return res.status(500).send({

                                    status: "failed",

                                    message:
                                        err.sqlMessage ||
                                        "Unable to update shop owner status."

                                });

                            }


                            console.log(
                                "Shop Owner Status Updated Successfully"
                            );


                            // =====================================
                            // STEP 4
                            // SEND ACCEPTANCE EMAIL
                            // =====================================

                            var mailOptions = {

                                from:
                                    'YOUR_GMAIL@gmail.com',

                                to:
                                    shopowner.email,

                                subject:
                                    'Agri Connect Kerala - Registration Approved',

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

                                            Welcome ${shopowner.ownername}!

                                        </h3>


                                        <p>

                                            Your shop owner registration
                                            has been successfully approved
                                            by the administrator.

                                        </p>


                                        <p>

                                            You can now login to your
                                            Agri Connect Kerala account.

                                        </p>


                                        <div style="
                                            background-color: #f5f5f5;
                                            padding: 15px;
                                            border-radius: 8px;
                                            margin: 20px 0;
                                        ">

                                            <p>

                                                <strong>
                                                    Shop Name:
                                                </strong>

                                                ${shopowner.shopname}

                                            </p>


                                            <p>

                                                <strong>
                                                    Owner Name:
                                                </strong>

                                                ${shopowner.ownername}

                                            </p>


                                            <p>

                                                <strong>
                                                    Username:
                                                </strong>

                                                ${shopowner.username}

                                            </p>


                                            <p>

                                                <strong>
                                                    Password:
                                                </strong>

                                                ${shopowner.password}

                                            </p>


                                            <p>

                                                <strong>
                                                    Account Status:
                                                </strong>

                                                <span style="
                                                    color: green;
                                                    font-weight: bold;
                                                ">

                                                    Accepted

                                                </span>

                                            </p>

                                        </div>


                                        <p>

                                            You can now login and use
                                            Agri Connect Kerala to:

                                        </p>


                                        <ul>

                                            <li>
                                                Update agricultural market prices
                                            </li>

                                            <li>
                                                View farmer products
                                            </li>

                                            <li>
                                                Send purchase requests
                                            </li>

                                            <li>
                                                Manage your shop activities
                                            </li>

                                        </ul>


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


                            console.log(
                                "Sending acceptance email to:",
                                shopowner.email
                            );


                            // =====================================
                            // SEND EMAIL
                            // =====================================

                            transporter.sendMail(

                                mailOptions,

                                function(error, info) {

                                    // =====================================
                                    // EMAIL FAILED
                                    // =====================================

                                    if (error) {

                                        console.log(
                                            "Shop Owner Email Sending Failed:"
                                        );

                                        console.log(error);


                                        // IMPORTANT:
                                        // Account is already accepted.
                                        // So don't undo the acceptance.

                                        return res.send({

                                            status: "success",

                                            message:
                                                "Shop owner accepted, but email could not be sent.",

                                            emailStatus:
                                                "failed",

                                            shopownerid:
                                                shopowner.shopownerid,

                                            loginid:
                                                shopowner.loginid

                                        });

                                    }


                                    // =====================================
                                    // EMAIL SUCCESS
                                    // =====================================

                                    console.log(
                                        "Shop Owner Acceptance Email Sent Successfully"
                                    );


                                    console.log(
                                        "Email Response:",
                                        info.response
                                    );


                                    // =====================================
                                    // FINAL RESPONSE
                                    // =====================================

                                    return res.send({

                                        status: "success",

                                        message:
                                            "Shop owner accepted and login details sent to email.",

                                        emailStatus:
                                            "sent",

                                        shopownerid:
                                            shopowner.shopownerid,

                                        loginid:
                                            shopowner.loginid

                                    });

                                }

                            );

                        }

                    );

                }

            );

        }

    );

});


module.exports = router;