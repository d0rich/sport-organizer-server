const invitation = require("../../../models/invitation")

module.exports = function(app, models) {
    app.get('/get_itrainers', (req, res) => {
        const UserID = req.param('userID')
        if (!UserID && !GroupID) return res.sendStatus(400)
        models.InviteTrainer.findAll({
                where: { UserID: UserID },
                include: []
            })
            .then(invite => {
                if (invite == null) return res.sendStatus(404)
                res.send(invite)
            })
            .catch(err => {
                console.error(err)
                res.sendStatus(500)
            })
    })
}