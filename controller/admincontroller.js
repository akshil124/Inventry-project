const { render } = require("ejs");
const multer = require("multer")
const Products = require("../model/Product")
const Category = require("../model/category")
const Orders = require("../model/Order")
module.exports.admin = async(req,res)=>{
    const data = await Products.find({})
    // console.log("data",data);
    res.render("admin/admin-panel.ejs",{data})
}

module.exports.addproduct = async(req,res)=>{
    await Products.create({
        productname : req.body.Name,
        prize : req.body.Prize,
        quantity : req.body.Quantity,
        category : req.body.Category,
        image : req.file.filename
    })
    await Products.find({}).populate('category')
    return res.redirect('/product/viewproduct');
}

module.exports.buyproduct = async(req,res)=>{
    const product = await Products.findById(req.params.id)
    await Products.findByIdAndUpdate(product._id,{quantity : product.quantity - req.body.addQuantity})
    await Orders.create({
        productname : product.productname,
        prize : product.prize,
        quantity : req.body.addQuantity,
        prizes : product.prize * req.body.addQuantity,
        image : product.image,
        userid : req?.user?._id,
    })
    console.log("product");
    return res.redirect('/')
}
module.exports.product = async(req,res) =>{
    const data = await Category.find({})
    const mydata = {}
    return res.render("admin/addproduct.ejs",{data,mydata})
}
module.exports.view = async(req,res) =>{
    const data = await Products.find({})
    return res.render("admin/viewproduct.ejs",{data})
}

module.exports.category = async(req,res) =>{
    return res.render("admin/category.ejs")
}
module.exports.addcategory = async(req,res) =>{
    // console.log("data+++",req.body);
    await Category.create(req.body)
    res.redirect("/product/category")
}

module.exports.editproduct = async(req,res)=>{
    const product = await Products.findById(req.params.id)
    const mydata = {
        _id : product._id,
        productname : product.productname,
        prize : product.prize,
        quantity : product.quantity,
        image : product.image,
    }
    const data = await Products.find({})
    return res.render('admin/addproduct.ejs',{
        mydata,data
    })
}
module.exports.UpdateProduct = async(req,res)=>{
    await Products.findByIdAndUpdate(req.params.id,{
        productname : req.body.Name,
        prize : req.body.Prize,
        quantity : req.body.Quantity       
    })
    return res.redirect('/product/viewproduct');
}

module.exports.deleteproduct = async(req,res) =>{
    await Products.findByIdAndRemove(req.params.id)
    return res.redirect('/product/viewproduct');
}

module.exports.orders = async(req,res) =>{
    const data = await Orders.find({}).populate('userid')
    console.log("data",data);
    return res.render("admin/orders.ejs",{data})
}

module.exports.ordercomplete = async(req,res)=>{
    await Orders.findByIdAndUpdate(req.params.id,{
        status : "complete"
    })
    return res.redirect("/product/orders")   
}