const MongoStore = require('connect-mongo');
require("dotenv").config();

var hour = 3600000;

const sessionStore = new MongoStore(
    { 
        mongoUrl: process.env.MONGODB_URI,
        collection:'sessions',
        stringify: false
    }
)

const sessionConfig = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { 
        // secure: true,
        expires: new Date(Date.now() + hour),
        maxAge: hour
     }, 
     store: sessionStore
}

module.exports = sessionConfig;