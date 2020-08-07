module.exports = function(app, models, jsonParser) {
    app.post('/setTrainer', jsonParser, (req, res) => {
        if (!req.body) return res.sendStatus(400);
        const UserID = req.body.UserID
        const GroupID = req.body.GroupID
        if (!UserID || !GroupID) return res.sendStatus(400)
        models.User.findByPk(UserID)
            .then(user => {
                if (!user) return res.sendStatus(400)
            })
            .catch(err => {
                console.error(err)
                res.sendStatus(500)
            })
        models.Group.findOne({
                where: { ID: GroupID }
            })
            .then(group => {
                if (!group) return res.sendStatus(404)
                models.Trainer.create({
                        GroupID: group.ID,
                        UserID: UserID
                    })
                    .then(response => {
                        res.send(response)
                    })
                    .catch(err => {
                        console.error(err)
                        res.sendStatus(500)
                    })
            })
    })
}