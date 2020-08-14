module.exports = function(app, models) {
    app.get('/events/get', (req, res) => {
        const ID = req.param('eventID')
        console.log(ID)
        if (!ID) return res.sendStatus(400)
        models.Event.findOne({
                where: { ID: ID },
                include: [
                    { model: models.Group, attributes: ['ID', 'Name'], through: { model: models.Event_Group, attributes: [] } }
                ]
            })
            .then(event => {
                if (event == null) return res.sendStatus(404)
                res.send(event)
            })
            .catch(err => {
                console.error(err)
                res.sendStatus(500)
            })
    })
}