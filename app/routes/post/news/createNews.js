module.exports = function(app, models, jsonParser) {
    app.post('/news-notes/create', jsonParser, (req, res) => {
        if (!req.body) return res.sendStatus(400);
        if (!req.body.Header) return res.sendStatus(400);
        if (!req.body.Text) return res.sendStatus(400);
        if (!req.body.SectionID) return res.sendStatus(400);
        if (!req.body.UserID) return res.sendStatus(400);
        const NewsNote = req.body;
        models.NewsNote.create({
                Header: NewsNote.Header,
                Text: NewsNote.Text,
                SectionID: NewsNote.SectionID,
                EventID: NewsNote.EventID,
                UserID: NewsNote.UserID
            })
            .then(result => {
                console.log(result.dataValues);
                res.send(result.dataValues)
            }).catch(err => {
                console.error(err)
                res.sendStatus(500)
            })
    })
}