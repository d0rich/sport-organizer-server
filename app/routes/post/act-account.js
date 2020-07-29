const auth = require('../../../config/email');

module.exports = function(app, models, jsonParser, nodemailer) {
  app.post('/act-account', jsonParser, async(req, res) => {
    if (!req.body) return res.sendStatus(400);
    if (!req.body.login) return res.sendStatus(400);
    if (!req.body.activateCode) return res.sendStatus(400);
    const actData = req.body
    let user = await models.User.findOne({ where: { Login: actData.login } })

    if (!user) return res.sendStatus(404);
    if (user.ActivateCode == null) return res.sendStatus(400);

    if (user.ActivateCode == actData.activateCode)
      await models.User.update({ ActivateCode: null }, { where: { ID: user.ID } })
      .catch(err => (console.log(err)))

    user = await models.User.findByPk(user.ID).catch(err => (console.log(err)))
    if (user.ActivateCode != null) return res.sendStatus(500);
    else res.sendStatus(200)



    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: auth
    });
    let mailOptions = {
      from: '"Sport Orginizer" <dorich.sender@gmail.com>',
      to: user.Email,
      subject: "Активация аккаунта",
      text: 'Вы успешно активировали аккаунт'
    }

    await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.res);
      }
    });
  })
}