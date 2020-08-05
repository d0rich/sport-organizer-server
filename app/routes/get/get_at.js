module.exports = function(app, models) {
    app.get('/get_at', (req, res) => {
        const UserID = req.param('UserID')
        console.log(UserID)
        if (!UserID) return res.sendStatus(400)
        models.Age_type.findAll({
                where: { UserID: UserID },
                order: ['Age_range']
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