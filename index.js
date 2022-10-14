require('dotenv').config()
const express = require("express")
const app = express()
const bodyparser = require("body-parser") 
const db = require("./config/db")
const routes  = require("./routes")
const flash = require('connect-flash');
const flashmessage = require('./middleware/flashmessage');
const session = require('express-session');
const passport = require('passport');
const passportlocal = require('./controller/passport-local');


app.use(bodyparser())
app.set("view engine","ejs")
app.use(express.static('uploads'))
db.mongoose.connect(db.url).then(() => {
    console.log("mongodb connected");
}).catch((error) => {
    console.log("mongodb err ++",error);
})
app.use(session({
    secret : 'inventory',
    resave : false,
    saveUninitialized : true,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(flashmessage.flashmessage)
app.use(routes)
app.listen(process.env.PORT,() => {
    console.info('server connected')
})