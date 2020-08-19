module.exports = function(app, models) {
    app.get('/news-notes/get/byParams', (req, res) => {
        const Sections = JSON.parse(req.param('sections'))
        const Sports = JSON.parse(req.param('sports'))
        let SectionDetails
        let SportDetails
        if (Sections.length === 0) SectionDetails = {}
        else SectionDetails = { ID: Sections }
        if (Sports.length === 0) SportDetails = {}
        else SportDetails = { ID: Sports }
        console.log(Sections[0])
        console.log(Sports[0])
        models.NewsNote.findAll({
                order: [
                    ['updatedAt', 'DESC'],
                    ['createdAt', 'DESC']
                ],
                include: [
                    { model: models.User, attributes: ['ID', 'Login', 'Name', 'Surname'] },
                    {
                        model: models.Section,
                        attributes: ['ID', 'Name', 'SportTypeID'],
                        where: SectionDetails,
                        include: [{
                            model: models.Sport_type,
                            attributes: ['ID', 'Name'],
                            where: SportDetails
                        }]
                    },
                    { model: models.Event, attributes: ['ID', 'Name', 'TimeRange'] }
                ]
            })
            .then(news => {
                res.send(news)
            })
            .catch(err => {
                console.error(err)
                res.sendStatus(500)
            })

    })
}