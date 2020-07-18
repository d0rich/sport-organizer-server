const test = require('./test')
const fillDictionary = require('./fillDictionary')

//post
const register = require('./post/register')
const actAccount = require('./post/act-account')
    //get
const getUser = require('./get/user')

module.exports = function(app, models, jsonParser, nodemailer) {
    test(app, models, jsonParser)
    fillDictionary(app, models, jsonParser)

    //post
    register(app, models, jsonParser, nodemailer)
    actAccount(app, models, jsonParser, nodemailer)
        //get
    getUser(app, models)
}