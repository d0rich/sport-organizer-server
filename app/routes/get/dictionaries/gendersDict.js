module.exports = function(app, models) {
    app.get('/dictionaries/genders', (req, res) => {
        models.Gender_type.findAll({
                attributes: ['ID', 'Name'],
                order: ['Name']
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