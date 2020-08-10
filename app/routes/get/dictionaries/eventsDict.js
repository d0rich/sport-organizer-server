module.exports = function(app, models) {
    app.get('/dictionaries/events', (req, res) => {
        models.Event_type.findAll({
                attributes: ['ID', 'Name'],
                order: ['Name']
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