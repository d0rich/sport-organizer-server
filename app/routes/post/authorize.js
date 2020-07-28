var crypto = require('crypto');

const encodeBase64Url = function(string) {
    let Base64 = Buffer.from(string).toString('base64')
    return Base64
}

module.exports = function(app, models, jsonParser) {
    app.post('/authorize', jsonParser, async(req, res) => {
        if (!req.body) return res.sendStatus(400)
        const Login = req.body.login
        const Password = req.body.password
        if (!Login || !Password) return res.sendStatus(400)
        models.User.findOne({
                where: {
                    Login: Login,
                    Password: Password
                }
            })
            .then(user => {
                if (user == null) return res.sendStatus(404)
                console.log('wasted')
                let header = { alg: "SHA256", typ: "JWT" }
                let payload = {
                    userID: user.ID,
                    created: new Date().toISOString(),
                    sub: 'access'
                }
                let secretKey = 'S4vEHyg69aLL1uLLlk4'
                let unsignedToken = encodeBase64Url(JSON.stringify(header)) + '.' + encodeBase64Url(JSON.stringify(payload))
                let signature = crypto.createHmac('sha256', secretKey).update(unsignedToken).digest('hex')
                let token = encodeBase64Url(JSON.stringify(header)) + '.' + encodeBase64Url(JSON.stringify(payload)) + '.' + encodeBase64Url(signature)
                res.send(token)

            }).catch(err => {
                res.send(err)
            })

    })
}