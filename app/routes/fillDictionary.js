module.exports = function(app, models, jsonParser) {
    app.post('/fillDictionary', jsonParser, async(req, res) => {
        const Genders = ['m', 'f']
        const Sports = ['1', '2', '3']
        const Events = ['1', '2', '3']
        const Nots = ['a', 'b', 'c']
        Genders.forEach(gender => {
            models.Gender_type.create({ Name: gender })
                .then(result => {
                    console.log(result.dataValues);
                }).catch(err => console.log(err))
        });
        res.send('xyz')
    })
}