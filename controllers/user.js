const User = require('../models/user');

const findUserById = async (userId) => {
    let user = await User.findById(userId);

    if (!user || user == null) {
        return `User not found!`, null;
    }

    return null, user;
}

module.exports = {
    findUserById
}