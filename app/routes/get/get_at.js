module.exports = function(app, models) {
    app.get('/get_at', async(req, res) => {
        const UserID = req.param('UserID')
        console.log(UserID)
        if (!UserID) return res.sendStatus(400)
        models.Age_type.findAll({
                where: { UserID: UserID },
                order: ['Age_range'],
                include: [
                    { model: models.User, attributes: ['ID', 'Login', 'Name', 'Surname'] },
                    { model: models.Group, attributes: ['ID', 'Name'] }
                ]
            })
            .then(ageType => {
                if (ageType == null) return res.sendStatus(404)
                res.send(ageType)
            })
            .catch(err => {
                console.error(err)
                res.sendStatus(500)
            })
    })
}