const User = require("../model/user")
const bcrypt = require("bcrypt")
const flash = require('connect-flash');
const Products = require("../model/Product")
const Category = require("../model/category");
const Orders = require("../model/Order");
module.exports.register = (req,res)=>{
    return res.render("user/register.ejs")
}
module.exports.login = (req,res)=>{
    return res.render("user/login.ejs")
}
module.exports.createuser = async(req,res)=>{
    const user = await User.findOne({email : req.body.email});
    if(!user){
        const password = await bcrypt.hash(req.body.password,10);
        req.body.password = password;

        await User.create(req.body);
        req.flash('success','User Created successfully');
        return res.redirect('/user/login');
    }else{
        req.flash('error','User Already Exist');
        return res.redirect('/user/register');
    }

}

module.exports.loginuser =  (req,res) => {
    
    req.flash('success','User Login Successfully')
    return res.redirect('/');
   
}
module.exports.home = async(req,res) =>{
    const data = await Products.find({});            
    // console.log(data);
    const Categor = await Category.find({})

    res.render('home.ejs',{data,Categor,user : req.user,})
}
module.exports.logout = async(req,res) =>{
    req.logout((error) => {
        if(error){
            return next(error);
        }
        req.flash('error','User Logout Successfully');
        res.redirect('/user/login')
    })
}

module.exports.getCategory = async(req,res)=>{
    const Categor = await Category.find({});
   const products = await Products.find({ category : req.params.id })
   return res.render('home.ejs',{
    data : products,
    Categor
});
}

module.exports.cart = async(req,res)=>{
    const data = await Orders.find({}).populate('userid')
    console.log("user++",req.user);
    return res.render("user/cart.ejs",{data,userid : req.user._id })
}