module.exports = function(app, models, jsonParser) {
    app.post('/groups/trainees/invitaions/use', jsonParser, (req, res) => {
        if (!req.body) return res.sendStatus(400);
        const UserID = req.body.ID
        const Code = req.body.invCode
        if (!UserID || !Code) return res.sendStatus(400)
        models.User.findByPk(UserID)
            .then(user => {
                if (!user) return res.sendStatus(400)
            })
            .catch(err => {
                console.error(err)
                res.sendStatus(500)
            })
        models.Invitation.findOne({
                where: { Code: Code },
                include: {
                    model: models.Group,
                    attributes: ['ID', 'Name']
                }
            })
            .then(code => {
                if (!code) return res.sendStatus(404)
                if (!code.Group) return res.sendStatus(404)
                if (code.EntranceNum > 0) {
                    models.Trainee.create({
                        GroupID: code.Group.ID,
                        UserID: UserID
                    })
                    if (code.EntranceNum - 1 <= 0) {
                        models.Invitation.destroy({ where: { Code: Code } })
                            .then(() => {
                                res.sendStatus(200)
                            })
                            .catch(err => {
                                console.error(err)
                                res.sendStatus(500)
                            })
                    } else
                        models.Invitation.update({ EntranceNum: code.EntranceNum - 1 }, { where: { Code: Code } })
                        .then(() => {
                            res.send(200)
                        })
                        .catch(err => {
                            console.error(err)
                            res.sendStatus(500)
                        })
                } else {
                    models.Invitation.destroy({ where: { Code: Code } })
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