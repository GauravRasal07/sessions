const { default: mongoose } = require('mongoose');
const { User, Session } = require('../models');


const findUserById = async (userId) => {
    let user = await User.findById(userId);

    if (!user || user == null) {
        return `User not found!`, null;
    }

    return null, user;
}


const findSessionByUserId = async (userId) => {
    let session = await Session.findOne({'session.userId': userId});

    if (!session) return `session not found`, null;

    return null, session;
}


const deleteSessionById = async (userId) => {
    try {
        let session = await Session.findOneAndDelete({"session.userId": userId});
    } catch (err) {
        console.log(err);
    }

    return;
}

module.exports = {
    findUserById,
    findSessionByUserId,
    deleteSessionById
}