module.exports = function(app, models, jsonParser) {
    app.post('/updateInf', jsonParser, async(req, res) => {
        if (!req.body) return res.sendStatus(400)
        const NewInfo = req.body;
        models.User.update({
                Name: NewInfo.Name,
                Surname: NewInfo.Surname,
                Birthdate: NewInfo.Birthdate,
                GenderTypeID: NewInfo.Gender,
                Height: NewInfo.Height,
                Weight: NewInfo.Weight
            }, { where: { ID: ID } })
            .then(result => {
                console.log(result.dataValues);
                res.send(result.dataValues)
            }).catch(err => console.error(err))
    })
}