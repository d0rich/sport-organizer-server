module.exports = function(app, models) {
    app.get('/authorize', async(req, res) => {
        const Login = req.param('login')
        const Password = req.param('password')
        if (!Login || !Password) return res.sendStatus(400)
        models.User.findOne({
                where: {
                    Login: Login,
                    Password: Password
                }
            })
            .then(user => {
                if (user == null) return res.sendStatus(404)
                res.send(user)
            }).catch(err => {
                res.send(err)
            })

    })
}