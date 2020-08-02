module.exports = function(app, models) {
    app.get('/gendersDict', (req, res) => {
        models.Gender_type.findAll({
                attributes: ['ID', 'Name']
            })
            .then(genders => {
                res.send(genders)
            })
            .catch(err => {
                console.error(err)
                res.sendStatus(500)
            })
    })
}