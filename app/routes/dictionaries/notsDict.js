module.exports = function(app, models) {
    app.get('/notsDict', async(req, res) => {
        const nots = await models.Not_type.findAll({
                attributes: ['ID', 'Name']
            })
            .then(nots => {
                res.send(nots)
            })
            .catch(err => {
                console.error(err)
                res.sendStatus(500)
            })
    })
}