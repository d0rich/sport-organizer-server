const IncToken = require('../../../classes/incToken')
const crypto = require('crypto')

const encodeBase64Url = function(string) {
    let Base64 = Buffer.from(string).toString('base64')
    return Base64
}

module.exports = function(app, models, jsonParser) {

    app.post('/account/authorize', jsonParser, async(req, res) => {
        if (!req.body) return res.sendStatus(400)
        const Login = req.body.login
        const Password = req.body.password
        if (!Login || !Password) return res.sendStatus(400)
        models.User.findOne({ where: { Login: Login } })
            .then(user => {
                if (user == null) return res.sendStatus(404)
                crypto.pbkdf2(Password, user.Salt, 1000, 256, null, (err, key) => {
                    if (err) {
                        console.log(err.message)
                        return res.sendStatus(500)
                    }
                    if (key.toString('hex') == user.Password) {
                        const token = new IncToken(user.ID)
                        res.send(token.token)
                    } else return res.sendStatus(404)
                })
            })
            .catch(err => {
                console.error(err.message)
            })

    })
}
