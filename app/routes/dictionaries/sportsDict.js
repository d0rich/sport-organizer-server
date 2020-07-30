module.exports = function(app, models) {
    app.get('/sportsDict', async(req, res) => {
        const sports = await models.Sport_type.findAll({
                attributes: ['ID', 'Name']
            })
            .then(
                res.send({ sports })
            )
            .catch(err => {
                console.error(err)
                res.sendStatus(500)
            })
    })
}