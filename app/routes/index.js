const test = require('./test')

//dictionaries
const getEventDict = require('./dictionaries/eventsDict')
const getGenderDict = require('./dictionaries/gendersDict')
const getNotDict = require('./dictionaries/notsDict')
const getSporttDict = require('./dictionaries/sportsDict')

//post
const register = require('./post/register')
const actAccount = require('./post/act-account')
const fillDictionary = require('./post/fillDictionary')
const createSection = require('./post/createSection')
const createGroup = require('./post/createGroup')
const createEvent = require('./post/createEvent')
const authorize = require('./post/authorize')

//get
const getUser = require('./get/user')
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
    createSection(app, models, jsonParser)
    createGroup(app, models, jsonParser)
    createEvent(app, models, jsonParser)
    authorize(app, models, jsonParser)

    //get
    getUser(app, models)
    getSection(app, models)
    getGroup(app, models)

}