module.exports = function(app, models, jsonParser) {
    app.post('/events/create', jsonParser, (req, res) => {
        if (!req.body) return res.sendStatus(400);
        const NewEvent = req.body;
        models.Event.create({
                Name: NewEvent.Name,
                Description: NewEvent.Description,
                TimeRange: [NewEvent.ST, NewEvent.ET],
                EventTypeID: NewEvent.EventTypeID
            })
            .then(result => {
                console.log(result.dataValues);
                res.send(result.dataValues)
                let events_group = []
                NewEvent.Groups.forEach(groupID => {
                    events_group.push({
                        GroupID: groupID,
                        EventID: result.dataValues.ID
                    })
                });
                models.Event_Group.bulkCreate(events_group)
                    .catch(err => {
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