module.exports = function(app, models) {
    app.get('/eventsDict', async(req, res) => {
        const events = await models.Event_type.findAll({
            attributes: ['ID', 'Name']
        })
        res.send({ events })
    })
}