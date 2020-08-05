const { DataTypes } = require("sequelize");

module.exports = function(seq) {
    //Создаём юзера
    const User = require('./users')(seq, DataTypes)
        //Пол
    const Gender_type = require('./gender-types')(seq, DataTypes)
    User.belongsTo(Gender_type, { foreignKey: { allowNull: false }, onDelete: 'SET NULL', onUpdate: 'CASCADE' })
    Gender_type.hasMany(User)
        //Виды спорта
    const Users_sport = require('./users-sports')(seq, DataTypes)
    const Sport_type = require('./sport-types')(seq, DataTypes)
    Sport_type.belongsToMany(User, { as: 'Sportsmen', through: Users_sport, onDelete: 'SET NULL', onUpdate: 'CASCADE' })
    User.belongsToMany(Sport_type, { as: 'Sports', through: Users_sport, onDelete: 'SET NULL', onUpdate: 'CASCADE' })
        //Секции
    const Section = require('./sections')(seq, DataTypes)
        //Секции по видам спорта
    Section.belongsTo(Sport_type, { foreignKey: { allowNull: false }, onDelete: 'SET NULL', onUpdate: 'CASCADE' })
    Sport_type.hasMany(Section)
        //Создатель секции
    User.hasMany(Section)
    Section.belongsTo(User, { foreignKey: { allowNull: false }, onDelete: 'SET NULL', onUpdate: 'CASCADE' })

    //Группы
    const Group = require('./groups')(seq, DataTypes)
    const Age_type = require('./age-types')(seq, DataTypes)
    Group.belongsTo(Section, { foreignKey: { allowNull: false }, onDelete: 'SET NULL', onUpdate: 'CASCADE' })
    Section.hasMany(Group)

    Group.belongsTo(Age_type, { foreignKey: { allowNull: false }, onDelete: 'SET NULL', onUpdate: 'CASCADE' })
    Age_type.hasMany(Group)

    Age_type.belongsTo(User, { foreignKey: { allowNull: false }, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    User.hasMany(Age_type)

    //Спортсмены
    const Trainee = require('./trainees')(seq, DataTypes)
    User.belongsToMany(Group, { as: 'TraineeIn', through: Trainee, onDelete: 'SET NULL', onUpdate: 'CASCADE' })
    Group.belongsToMany(User, { as: 'Trainees', through: Trainee, onDelete: 'SET NULL', onUpdate: 'CASCADE' })
        //Тренера
    const Trainer = require('./trainers')(seq, DataTypes)
    User.belongsToMany(Group, { as: 'TrainerIn', through: Trainer, onDelete: 'SET NULL', onUpdate: 'CASCADE' })
    Group.belongsToMany(User, { as: 'Trainers', through: Trainer, onDelete: 'SET NULL', onUpdate: 'CASCADE' })
        //События
    const Event = require('./events')(seq, DataTypes)
    const Event_type = require('./event-types')(seq, DataTypes)
    Event.belongsTo(Event_type, { foreignKey: { allowNull: false }, onDelete: 'SET NULL', onUpdate: 'CASCADE' })
    Event_type.hasMany(Event)
        //События в группах
    const Event_Group = require('./events-groups')(seq, DataTypes)
    Event.belongsToMany(Group, { as: 'EventsInGroups', through: Event_Group, onDelete: 'SET NULL', onUpdate: 'CASCADE' })
    Group.belongsToMany(Event, { as: 'GroupEvents', through: Event_Group, onDelete: 'SET NULL', onUpdate: 'CASCADE' })
        //Объявления 
    const NewsNote = require('./newsNotes')(seq, DataTypes)
        //Объявления в группах
    NewsNote.belongsTo(Group, { foreignKey: { allowNull: false }, onDelete: 'SET NULL', onUpdate: 'CASCADE' })
    Group.hasMany(NewsNote)
        //Событие
    NewsNote.belongsTo(Event, { onDelete: 'SET NULL', onUpdate: 'CASCADE' })
    Event.hasMany(NewsNote)

    const Notification = require('./notifications')(seq, DataTypes)
    const Not_type = require('./not-types')(seq, DataTypes)
        //Тип уведомления
    Notification.belongsTo(Not_type, { foreignKey: { allowNull: false }, onDelete: 'SET NULL', onUpdate: 'CASCADE' })
    Not_type.hasMany(Notification)
        //Оставить к событию
    Notification.belongsTo(Event, { foreignKey: { allowNull: false }, onDelete: 'SET NULL', onUpdate: 'CASCADE' })
    Event.hasMany(Notification)
        //Создание пользователем уведомлений
    Notification.belongsTo(User, { foreignKey: { allowNull: false }, onDelete: 'SET NULL', onUpdate: 'CASCADE' })
    User.hasMany(Notification)

    //Коды приглашений в группы
    const Invitation = require('./invitation')(seq, DataTypes)
    Invitation.belongsTo(Group, { foreignKey: { allowNull: false }, onDelete: 'SET NULL', onUpdate: 'CASCADE' })
    Group.hasMany(Invitation)


    return {
        User,
        Gender_type,
        Users_sport,
        Sport_type,
        Section,
        Group,
        Age_type,
        Trainee,
        Trainer,
        Event,
        Event_type,
        Event_Group,
        NewsNote,
        Notification,
        Not_type,
        Invitation,
        Trainer_Invitation
    }
}