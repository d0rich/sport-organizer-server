module.exports = function(app, models) {
    app.get('/sportsDict', (req, res) => {
        const sports = await models.Sport_type.findAll({
                attributes: ['ID', 'Name']
            })
            .then(sports => {
                res.send(sports)
            })
            .catch(err => {
                console.error(err)
                res.sendStatus(500)
            })
    })
}