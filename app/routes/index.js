const test = require('./test')
const fillDictionary = require('./fillDictionary')
module.exports = function(app, models, jsonParser) {
    test(app, models, jsonParser)
    fillDictionary(app, models, jsonParser)
}