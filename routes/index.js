const express = require("express");
const routes = express.Router();
const user = require("./user")
const product = require("./product")
const usercontroller = require("../controller/usercontroller")
const passport = require('passport');
const passportlocal = require('../controller/passport-local');
const admincontroller = require("../controller/admincontroller")
routes.get("/",passport.checkAuthentication,usercontroller.home)
routes.use("/user",user)
routes.use('/product',product)
routes.get('/adminpanel',passport.checkAuthenticationadmin,admincontroller.admin)
routes.get("/cart",usercontroller.cart)

module.exports = routes;