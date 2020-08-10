module.exports = function(app, models, jsonParser) {
    app.post('/users/update/extras', jsonParser, (req, res) => {
        if (!req.body) return res.sendStatus(400)
        const NewInfo = req.body;
        models.User.findOne({ where: { ID: NewInfo.ID } })
            .then(user => {
                if (!user) return res.sendStatus(404);
                models.User.update({
                        Name: NewInfo.Name,
                        Surname: NewInfo.Surname,
                        Birthdate: NewInfo.Birthdate,
                        GenderTypeID: NewInfo.Gender,
                        Height: NewInfo.Height,
                        Weight: NewInfo.Weight
                    }, { where: { ID: user.ID } })
                    .then(result => {
                        console.log(result);
                        res.send(result)
                    }).catch(err => {
                        console.error(err)
                        res.sendStatus(500)
                    })
            })
            .catch(err => {
                console.error(err)
                res.sendStatus(500)
            })
    })
}