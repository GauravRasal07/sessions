const mongoose = require('mongoose');

passportLocalMongoose = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
	username : {type : String, unique : true, required : true},
	password : String,
	resetPasswordToken : String,
	resetPasswordExpires : Date,
	sessionId: {
		type: String, unique: true
	}
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);