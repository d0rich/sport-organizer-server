module.exports = function(app, models, jsonParser) {
    app.post('/updateInf', jsonParser, async(req, res) => {
        if (!req.body) return res.sendStatus(400)
        const NewInfo = req.body;
        let user = await models.User.findOne({ where: { ID: NewInfo.ID } })
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
                console.log(result.dataValues);
                res.send(result.dataValues)
            }).catch(err => {
                console.error(err)
                res.sendStatus(500)
            })
    })
}