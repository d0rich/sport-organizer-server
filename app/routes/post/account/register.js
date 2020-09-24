const { DataTypes } = require("sequelize");
var crypto = require('crypto');
const emailConfig = require('../../../../config/email');

module.exports = function(app, models, jsonParser, nodemailer) {
    app.post('/account/register', jsonParser, async(req, res) => {
        if (!req.body) return res.sendStatus(400);
        let NewUser = req.body;
        const actCode = crypto.randomBytes(16).toString('hex')
        models.User.create({
                Login: NewUser.Login,
                PhoneNumber: NewUser.PhoneNumber,
                Email: NewUser.Email,
                ActivateCode: actCode,
                Password: NewUser.Password,
                Salt: NewUser.Salt,
                Name: NewUser.Name,
                Surname: NewUser.Surname,
                Birthdate: NewUser.Birthdate,
                GenderTypeID: NewUser.Gender
            })
            .then(result => {
                console.log(result.dataValues);
                let user_sports = []
                NewUser.Sports.forEach(sportID => {
                    user_sports.push({
                        SportTypeID: sportID,
                        UserID: result.dataValues.ID
                    })
                });
                models.Users_sport.bulkCreate(user_sports)
                    .catch(err => console.error(err.message))
            }).catch(err => console.error(err.message))

        let transporter = nodemailer.createTransport(emailConfig);
        let mailOptions = {
            from: '"Sport Orginizer" <dorich.sender@gmail.com>',
            to: NewUser.Email,
            subject: "Ваш код активации аккаунта",
            text: `${actCode}`
        }

        await transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error(error.message);
            } else {
                console.log('Email sent: ' + info.res);
                res.sendStatus(200)
            }
        });
    })
}