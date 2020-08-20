module.exports = function(app, models) {
    app.get('/notifications/get', (req, res) => {
        const ID = req.param('notID')
        console.log(ID)
        if (!ID) return res.sendStatus(400)
        models.Notification.findOne({
                where: { ID: ID },
                include: [
                    { model: models.User, attributes: ['ID', 'Login', 'Name', 'Surname'] },
                    { model: models.Not_type, attributes: ['ID', 'Name'] },
                    {
                        model: models.Event,
                        attributes: ['ID', 'Name', 'Description', 'TimeRange', 'EventTypeID'],
                        include: [{ model: models.Event_type, attributes: ['ID', 'Name'] }]
                    }
                ]
            })
            .then(notification => {
                if (notification == null) return res.sendStatus(404)
                res.send(notification)
            })
            .catch(err => {
                console.error(err)
                res.sendStatus(500)
            })
    })
}