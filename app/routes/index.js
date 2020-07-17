const test = require('./test')
const fillDictionary = require('./fillDictionary')

//post
const register = require('./post/register')
const actAccaunt = require('./post/act-accaunt')
module.exports = function(app, models, jsonParser, nodemailer) {
    test(app, models, jsonParser)
    fillDictionary(app, models, jsonParser)

    //post
    register(app, models, jsonParser, nodemailer)
    actAccaunt(app, models, jsonParser, nodemailer)
}