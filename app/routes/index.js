const test = require('./test')

//dictionaries
const getEventDict = require('./get/dictionaries/eventsDict')
const getGenderDict = require('./get/dictionaries/gendersDict')
const getNotDict = require('./get/dictionaries/notsDict')
const getSporttDict = require('./get/dictionaries/sportsDict')

//post
const register = require('./post/register')
const actAccount = require('./post/act-account')
const fillDictionary = require('./post/fillDictionary')
const createAT = require('./post/creation/createAT')
const createSection = require('./post/creation/createSection')
const createGroup = require('./post/creation/createGroup')
const createEvent = require('./post/creation/createEvent')
const authorize = require('./post/authorize')

//get
const getUser = require('./get/user')
const getAT = require('./get/get_at')
const getSection = require('./get/get_section')
const getGroup = require('./get/get_group')

module.exports = function(app, models, jsonParser, nodemailer) {

    test(app, models, jsonParser)

    //dictionaries
    getEventDict(app, models)
    getGenderDict(app, models)
    getNotDict(app, models)
    getSporttDict(app, models)

    //post
    register(app, models, jsonParser, nodemailer)
    actAccount(app, models, jsonParser, nodemailer)
    fillDictionary(app, models, jsonParser)
    createAT(app, models, jsonParser)
    createSection(app, models, jsonParser)
    createGroup(app, models, jsonParser)
    createEvent(app, models, jsonParser)
    authorize(app, models, jsonParser)

    //get
    getUser(app, models)
    getAT(app, models)
    getSection(app, models)
    getGroup(app, models)

}