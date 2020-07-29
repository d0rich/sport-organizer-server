module.exports = function(app, models) {
    app.get('/user', async(req, res) => {
        const Login = req.param('login')
        const ID = req.param('id')
        console.log(ID)
        if (!Login && !ID) return res.sendStatus(400)
        let detail = {}
        if (Login) detail = { Login: Login }
        if (ID) detail = { ID: ID }
        models.User.findOne({
                where: detail,
                include: [
                    { model: models.Sport_type, as: 'Sports', attributes: ['ID', 'Name'], through: { attributes: [] } },
                    { model: models.Section, attributes: ['ID', 'Name'] },
                    { model: models.Group, as: 'TrainerIn', attributes: ['ID', 'Name'], through: { model: models.Trainer, attributes: [] } },
                    { model: models.Group, as: 'TraineeIn', attributes: ['ID', 'Name'], through: { model: models.Trainee, attributes: [] } }
                ]
            })
            .then(user => {
                if (user == null) return res.sendStatus(404)
                res.send(user)
            })
            .catch(err => {
                console.log(err)
                res.sendStatus(500)
            })
    })
}