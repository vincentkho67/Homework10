const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const pool = require("./config/config");

const diskStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "/upload"))
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
});

router.use("/upload", express.static(path.join(__dirname, "upload")));

router.post("/upload/:id/image", 
multer({storage: diskStorage}).single("image"), 
(req,res) => {
    const file = req.file.path;
    const {id} = req.params;
    console.log(file)

    if(!file) {
        res.status(400).json({
            message: "NO file is selected"
        })

    } else {

        const updateMovieUrl = `
            UPDATE movies
            SET image_url = $1
            WHERE id = $2
        `

        const imageUrl = `http://localhost:3000/upload/${req.file.filename}`

        pool.query(updateMovieUrl, [imageUrl, id], (err,result) => {
            if(err) {
                throw err
            } else {
                res.status(200).json({
                    message: "File Uploaded"
                })
            }
        })
        res.status(200).json({
            message: "File uploaded"
        })
    }

});



module.exports = router;