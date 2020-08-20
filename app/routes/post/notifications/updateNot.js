module.exports = function(app, models, jsonParser) {
    app.post('/notifications/update', jsonParser, (req, res) => {
        if (!req.body) return res.sendStatus(400)
        const NewInfo = req.body;
        models.Notification.findOne({ where: { ID: NewInfo.ID } })
            .then(notification => {
                if (!notification) return res.sendStatus(404);
                models.Notification.update({
                        Comment: NewNot.Comment,
                        NotTypeID: NewNot.NotTypeID
                    }, { where: { ID: notification.ID } })
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