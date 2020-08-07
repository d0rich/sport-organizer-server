module.exports = function(app, models, jsonParser) {
    app.post('/becomeTrainer', jsonParser, (req, res) => {
        if (!req.body) return res.sendStatus(400);
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
                models.Trainer.create({
                        GroupID: GroupID,
                        UserID: UserID
                    })
                    .then(response => {
                        res.send(response)
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
    })
}