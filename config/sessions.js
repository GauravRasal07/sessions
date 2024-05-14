require("dotenv").config();

var hour = 3600000

const sessionConfig = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { 
        secure: true,
        expires: new Date(Date.now() + hour),
        maxAge: hour
     }
}

module.exports = sessionConfig;