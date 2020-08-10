module.exports = function(app, models, jsonParser) {
    app.post('/groups/trainers/invitations/accept', jsonParser, (req, res) => {
        if (!req.body) return res.sendStatus(400);
        const Accept = req.body.Accept
        const UserID = req.body.UserID
        const GroupID = req.body.GroupID
        if (!UserID || !GroupID) return res.sendStatus(400)
        models.InviteTrainer.findOne({
                where: {
                    GroupID: GroupID,
                    UserID: UserID
                }
            })
            .then(invite => {
                if (!invite) return res.sendStatus(404)
                if (Accept === true)
                    models.Trainer.create({
                        GroupID: GroupID,
                        UserID: UserID
                    })
                    .catch(err => {
                        console.error(err)
                        res.sendStatus(500)
                    })
                models.InviteTrainer.destroy({
                        where: {
                            GroupID: GroupID,
                            UserID: UserID
                        }
                    })
                    .then(() => {
                        res.sendStatus(200)
                    })
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