module.exports = function(app, models) {
    app.get('/eventsDict', (req, res) => {
        models.Event_type.findAll({
                attributes: ['ID', 'Name']
            })
            .then(events => {
                res.send(events)
            })
            .catch(err => {
                console.error(err)
                res.sendStatus(500)
            })
    })
}