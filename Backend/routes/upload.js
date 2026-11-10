var express = require('express');
var router = express.Router();

const util = require("util");
const multer = require("multer");

let storage = multer.diskStorage({

    destination: (req, file, cb) => {

        cb(null, "./public/images");

    },

    filename: (req, file, cb) => {

        console.log(file.originalname);

        cb(null, file.originalname);

    },

});

let uploadFile = multer({

    storage: storage,

}).single("file");

let uploadFileMiddleware = util.promisify(uploadFile);

router.post('/', async function(req, res) {

    try {

        await uploadFileMiddleware(req, res);

        if (!req.file) {

            return res.status(400).send({
                message: "Please upload a file."
            });

        }

        res.send({

            filename: req.file.filename

        });

    }

    catch (err) {

        console.log(err);

        res.status(500).send({

            message: "File upload failed."

        });

    }

});

module.exports = router;