module.exports = function(app, models, jsonParser) {
    app.post('/events/update', jsonParser, (req, res) => {
        if (!req.body) return res.sendStatus(400)
        const NewInfo = req.body;
        models.Event.findOne({ where: { ID: NewInfo.ID } })
            .then(event => {
                if (!event) return res.sendStatus(404);
                models.Event.update({
                        Name: NewInfo.Name,
                        Description: NewInfo.Description,
                        TimeRange: [NewInfo.ST, NewInfo.ET],
                        Timed: NewInfo.Timed
                    }, { where: { ID: event.ID } })
                    .then(result => {
                        console.log(result);
                        res.send(result)
                    }).catch(err => {
                        console.error(err)
                        res.sendStatus(500)
                    })
            })
            .catch(err => {
                console.error(err)
                res.sendStatus(500)
            })
    })
}