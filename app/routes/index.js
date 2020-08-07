const test = require('./test')

//dictionaries
const fillDictionary = require('./post/dictionaries/fillDictionary')
    //get
const getEventDict = require('./get/dictionaries/eventsDict')
const getGenderDict = require('./get/dictionaries/gendersDict')
const getNotDict = require('./get/dictionaries/notsDict')
const getSporttDict = require('./get/dictionaries/sportsDict')

//users
const register = require('./post/account/register')
const actAccount = require('./post/account/act-account')
const authorize = require('./post/account/authorize')
const updateInf = require('./post/account/updateInf')
    //get
const getUser = require('./get/users/user')

//sections
const createSection = require('./post/sections/createSection')
const updateSection = require('./post/sections/updateSection')
    //get
const getSection = require('./get/sections/get_section')

//groups
const createAT = require('./post/groups/createAT')
const updateAT = require('./post/groups/updateAT')
const createGroup = require('./post/groups/createGroup')
const updateGroup = require('./post/groups/updateGroup')
const createInvitation = require('./post/groups/createInvitation')
const setTrainer = require('./post/groups/setTrainer')
const useInvitation = require('./post/groups/useInvitation')
    //get
const getAT = require('./get/groups/get_at')
const getGroup = require('./get/groups/get_group')
const getInvitation = require('./get/groups/get_invitations')

//events
const createEvent = require('./post/events/createEvent')
    //get


module.exports = function(app, models, jsonParser, nodemailer) {

    test(app, models, jsonParser)

    //dictionaries
    fillDictionary(app, models, jsonParser)
    getEventDict(app, models)
    getGenderDict(app, models)
    getNotDict(app, models)
    getSporttDict(app, models)

    //user
    register(app, models, jsonParser, nodemailer)
    actAccount(app, models, jsonParser, nodemailer)
    authorize(app, models, jsonParser)
    updateInf(app, models, jsonParser)
    getUser(app, models)

    //sections
    createSection(app, models, jsonParser)
    getSection(app, models)

    //groups
    createAT(app, models, jsonParser)
    createGroup(app, models, jsonParser)
    createInvitation(app, models, jsonParser)
    updateSection(app, models, jsonParser)
    updateAT(app, models, jsonParser)
    updateGroup(app, models, jsonParser)
    setTrainer(app, models, jsonParser)
    useInvitation(app, models, jsonParser)
    getAT(app, models)
    getGroup(app, models)
    getInvitation(app, models)

    //events
    createEvent(app, models, jsonParser)

}