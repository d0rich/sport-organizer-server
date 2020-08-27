module.exports = function(app, models) {
    app.get('/notifications/get/byUser', (req, res) => {
        const UserID = req.param('userID')
        const EventID = req.param('eventID')
        if (!UserID && !EventID) return res.sendStatus(400)
        models.Notification.findAll({
                where: {
                    UserID: UserID,
                    EventID: EventID
                },
                include: [{ model: models.Not_type, attributes: ['ID', 'Name'] }]
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