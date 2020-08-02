module.exports = function(app, models, jsonParser) {
    app.post('/createEvent', jsonParser, async(req, res) => {
        if (!req.body) return res.sendStatus(400);
        const NewEvent = req.body;
        models.Group.findOne({ where: { Name: NewEvent.GroupName } }).then(group => {
            models.Event.create({
                    Name: NewEvent.Name,
                    Description: NewEvent.Description,
                    TimeRange: NewEvent.TimeRange,
                    GroupID: group.ID,
                    EventTypeID: NewEvent.Event_type
                })
                .then(result => {
                    console.log(result.dataValues);
                    res.send(result.dataValues)
                }).catch(err => console.error(err))
        })
    })
}