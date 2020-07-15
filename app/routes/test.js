const { user } = require("../../config/db-codefirst");

const { DataTypes } = require("sequelize");

module.exports = function(app, models, jsonParser) {
    app.post('/test', jsonParser, async(req, res) => {
        if (!req.body) return res.sendStatus(400);
        await models.Gender_type.create({
                Name: req.body.Name,
            }).then(result => {
                console.log(result.dataValues);
            }).catch(err => console.log(err))
            .then(
                await models.Gender_type.findAll()
                .then(users =>
                    res.send(users)
                ))
    })
}