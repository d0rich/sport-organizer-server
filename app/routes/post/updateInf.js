module.exports = function(app, models, jsonParser) {
    app.post('/updateInf', jsonParser, async(req, res) => {
        if (!req.body) return res.sendStatus(400)



    })
}