module.exports = function(app, models, jsonParser) {
    app.post('/fillDictionary', jsonParser, async(req, res) => {
        const Genders = ['Мужской', 'Женский']
        const Sports = ['1', '2', '3']
        const Events = ['1', '2', '3']
        const Nots = ['a', 'b', 'c']
        Genders.forEach(gender => {
            models.Gender_type.create({ Name: gender })
                .then(result => {
                    console.log(result.dataValues);
                }).catch(err => console.log(err))
        });
        Sports.forEach(sport => {
            models.Sport_type.create({ Name: sport })
                .then(result => {
                    console.log(result.dataValues);
                }).catch(err => console.log(err))
        });
        Events.forEach(event => {
            models.Event_type.create({ Name: event })
                .then(result => {
                    console.log(result.dataValues);
                }).catch(err => console.log(err))
        });
        Nots.forEach(not => {
            models.Not_type.create({ Name: not })
                .then(result => {
                    console.log(result.dataValues);
                }).catch(err => console.log(err))
        });
        res.send('xyz')
    })
}