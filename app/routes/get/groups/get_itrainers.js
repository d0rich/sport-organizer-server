module.exports = function(app, models) {
    app.get('/groups/trainers/invitations/get', (req, res) => {
        const UserID = req.param('userID')
        if (!UserID) return res.sendStatus(400)
        models.User.findOne({
                where: { ID: UserID },
                attributes: [],
                include: [{
                    model: models.Group,
                    as: 'InviteTrainerIn',
                    attributes: ['ID', 'Name'],
                    through: { model: models.InviteTrainer, attributes: [] },
                    include: [{
                        model: models.Section,
                        attributes: ['ID', 'Name'],
                        include: [{ model: models.Sport_type, attributes: ['ID', 'Name'] }]
                    }]
                }]
            })
            .then(invite => {
                if (invite == null) return res.sendStatus(404)
                res.send(invite.InviteTrainerIn)
            })
            .catch(err => {
                console.error(err)
                res.sendStatus(500)
            })
    })
}