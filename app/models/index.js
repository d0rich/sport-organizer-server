const { DataTypes } = require("sequelize");
module.exports = function(seq) {
    return {
        User: require('./users.js')(seq, DataTypes),
    }
}