const { DataTypes } = require("sequelize");

module.exports = function(seq) {
    //Создаём юзера
    const User = require('./users')(seq, DataTypes)
        //Пол
    const Gender_type = require('./gender-types')(seq, DataTypes)
    Gender_type.hasMany(User, { onDelete: 'SET NULL', onUpdate: 'CASCADE' })
        //Виды спорта
    const Users_sport = require('./users-sports')(seq, DataTypes)
    const Sport_type = require('./sport-types')(seq, DataTypes)
    Sport_type.belongsToMany(User, { through: Users_sport, onDelete: 'SET NULL', onUpdate: 'CASCADE' })
    User.belongsToMany(Sport_type, { through: Users_sport, onDelete: 'SET NULL', onUpdate: 'CASCADE' })
        //Секции
    const Section = require('./sections')(seq, DataTypes)
    Section.belongsTo(Sport_type, { onDelete: 'SET NULL', onUpdate: 'CASCADE' })

    return {
        User: User,
        Gender_type: Gender_type,
        Users_sport: Users_sport,
        Sport_type: Sport_type,
        Section: Section
    }
}