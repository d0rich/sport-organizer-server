module.exports = function(app, models, jsonParser) {
    app.post('/events/delete', jsonParser, (req, res) => {
        if (!req.body) return res.sendStatus(400);
        const EventID = req.body.ID;
        models.Event.findOne({ where: { ID: EventID } })
            .then(event => {
                if (!event) return res.sendStatus(404)
                else {
                    models.Event.destroy({ where: { ID: EventID } })
                        .then(() => {
                            res.sendStatus(404)
                        })
                        .catch(err => {
                            console.error(err)
                            res.sendStatus(500)
                        })
                }
            })
            .catch(err => {
                console.error(err)
                res.sendStatus(500)
            })

    })
}