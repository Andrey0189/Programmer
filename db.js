const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    userID: String,
    guildID: String,
    money: Number
});
module.exports = mongoose.model("db", userSchema);