module.exports = function(app, models) {
    app.get('/gendersDict', async(req, res) => {
        const genders = await models.Gender_type.findAll({
            attributes: ['ID', 'Name']
        })
        res.send(genders)
    })
}