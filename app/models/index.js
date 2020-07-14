const { DataTypes } = require("sequelize");
module.exports = function(seq) {
    const User = require('./users.js')(seq, DataTypes)
    return {
        User: User,
    }
}