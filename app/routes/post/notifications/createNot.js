module.exports = function(app, models, jsonParser) {
    app.post('/notifications/create', jsonParser, (req, res) => {
        if (!req.body) return res.sendStatus(400);
        if (!req.body.Comment) return res.sendStatus(400);
        if (!req.body.NotTypeID) return res.sendStatus(400);
        if (!req.body.EventID) return res.sendStatus(400);
        if (!req.body.UserID) return res.sendStatus(400);
        const NewNot = req.body;
        models.Notification.create({
                Comment: NewNot.Comment,
                NotTypeID: NewNot.NotTypeID,
                EventID: NewNot.EventID,
                UserID: NewNot.UserID
            })
            .then(result => {
                console.log(result.dataValues);
                res.send(result.dataValues)
            }).catch(err => {
                console.error(err)
                res.sendStatus(500)
            })
    })
}