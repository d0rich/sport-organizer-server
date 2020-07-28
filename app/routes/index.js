const test = require('./test')

//post
const register = require('./post/register')
const actAccount = require('./post/act-account')
const fillDictionary = require('./post/fillDictionary')
const createSection = require('./post/createSection')
const authorize = require('./post/authorize')

//get
const getUser = require('./get/user')
const getRegInf = require('./get/get_reg_inf')

module.exports = function(app, models, jsonParser, nodemailer) {
    test(app, models, jsonParser)

    //post
    register(app, models, jsonParser, nodemailer)
    actAccount(app, models, jsonParser, nodemailer)
    fillDictionary(app, models, jsonParser)
    createSection(app, models, jsonParser)
    authorize(app, models, jsonParser)

    //get
    getUser(app, models)
    getRegInf(app, models)


}