module.exports = function(app, models) {
    app.get('/sportsDict', async(req, res) => {
        const sports = await models.Sport_type.findAll({
            attributes: ['ID', 'Name']
        })
        res.send(sports)
    })
}