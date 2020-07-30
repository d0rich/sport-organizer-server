module.exports = function(app, models) {
    app.get('/notsDict', async(req, res) => {
        const nots = await models.Not_type.findAll({
            attributes: ['ID', 'Name']
        })
        res.send(nots)
    })
}