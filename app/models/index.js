const { DataTypes } = require("sequelize");
module.exports = function(seq) {
    const User = require('./users.js')(seq, DataTypes)
    const Gender_type = require('./gender-types.js')(seq, DataTypes, User)
    return {
        User: User,
        Gender_type: Gender_type
    }
}