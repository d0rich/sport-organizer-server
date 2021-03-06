module.exports = function(app, models) {
    app.get('/dictionaries/nots', (req, res) => {
        models.Not_type.findAll({
                attributes: ['ID', 'Name'],
                order: ['Name']
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