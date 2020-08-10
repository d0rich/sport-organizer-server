module.exports = function(app, models, jsonParser) {
    app.post('/inviteTrainer', jsonParser, (req, res) => {
        if (!req.body) return res.sendStatus(400);
        const Login = req.body.Login
        const GroupID = req.body.GroupID
        if (!Login || !GroupID) return res.sendStatus(400)

        models.User.findOne({
                where: { Login: Login }
            })
            .then(user => {
                models.Trainer.findOne({
                        where: {
                            UserID: user.ID,
                            GroupID: GroupID
                        }
                    })
                    .then(trainer => {
                        if (!trainer) {
                            models.InviteTrainer.findOne({
                                    where: {
                                        UserID: user.ID,
                                        GroupID: GroupID
                                    }
                                })
                                .then(itrainer => {
                                    if (!itrainer) {
                                        models.Group.findOne({
                                                where: { ID: GroupID }
                                            })
                                            .then(group => {
                                                if (!group) return res.sendStatus(404)
                                                models.InviteTrainer.create({
                                                        GroupID: group.ID,
                                                        UserID: user.ID
                                                    })
                                                    .then(response => {
                                                        res.send(response)
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
                                    } else
                                        res.sendStatus(200)
                                })
                                .catch(err => {
                                    console.error(err)
                                    res.sendStatus(500)
                                })
                        } else
                            res.sendStatus(400)
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