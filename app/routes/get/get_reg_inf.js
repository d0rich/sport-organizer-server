module.exports = function(app, models) {
    app.get('/get_reg_inf', async(req, res) => {
        const genders = await models.Gender_type.findAll({
            attributes: ['ID', 'Name']
        })
        const sports = await models.Sport_type.findAll({
            attributes: ['ID', 'Name']
        })
        res.send({ genders, sports })
    })
}