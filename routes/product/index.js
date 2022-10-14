const express = require('express');
const routes = express.Router()
const usercontroller = require('../../controller/usercontroller');
const admincontroller = require('../../controller/admincontroller');
const path = require("path")

const multer = require("multer")
let storage = multer.diskStorage({
    destination : (req,file,cb)=>{
        cb(null,path.join(__dirname,"../../uploads"))
    },
    filename : (req,file,cb)=>{
        console.info("file++ ",file)
        cb(null,Date.now() + file.originalname)
    }
    
})

let upload = multer({storage : storage})
routes.post('/addproduct',upload.single("Image"),admincontroller.addproduct)
routes.post('/buyproduct/:id',admincontroller.buyproduct)
routes.post("/addcategory",admincontroller.addcategory)
routes.get('/editproduct/:id',admincontroller.editproduct)
routes.post('/updateproduct/:id',admincontroller.UpdateProduct);
routes.get('/deleteproduct/:id',admincontroller.deleteproduct);
routes.get("/orders",admincontroller.orders)
routes.get('/addproduct',admincontroller.product)
routes.get('/viewproduct',admincontroller.view)
routes.get("/category",admincontroller.category)
routes.get("/:id",usercontroller.getCategory)
routes.get("/delivered/:id",admincontroller.ordercomplete)
module.exports = routes;