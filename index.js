import express from "express";
import qr from "qr-image";
import bodyParser from "body-parser";
import fs from "fs";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


app.get("/", (req, res) => {
    res.render("home.ejs")
})

app.post("/generate", (req, res) => {
    
    // Image Creation 
    const url = req.body.userLink;

    if (url !== undefined) {
        let qr_png = qr.image(url, { size: 15});
        qr_png.pipe(fs.createWriteStream('public/images/qr-image.png'));
    }
    else {
        console.log(`No Link in input box`);
        
    }
    
    res.render("home.ejs", 
        {
            htmlContent: `<img src="../public/images/qr-image.png" alt="QR Image">`
        }
    )
})

app.listen(port, (req, res) => {
    console.log(`Server is listening on port ${port}`);
    
})
