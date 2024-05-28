const mongoose = require('mongoose');

var sessionSchema = new mongoose.Schema({
    expires: Date,
    session: Object
});

module.exports = mongoose.model("session", sessionSchema);