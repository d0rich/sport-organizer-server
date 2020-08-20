module.exports = function(app, models, jsonParser) {
    app.post('/notifications/delete', jsonParser, (req, res) => {
        if (!req.body) return res.sendStatus(400);
        const NotID = req.body.ID;
        models.Notification.findOne({ where: { ID: NotID } })
            .then(notification => {
                if (!notification) return res.sendStatus(404)
                else {
                    models.Notification.destroy({ where: { ID: NotID } })
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