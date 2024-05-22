const mongoose = require('mongoose');

var sessionSchema = new mongoose.Schema({
    expires: Date,
    session: String
});

module.exports = mongoose.model("session", sessionSchema);