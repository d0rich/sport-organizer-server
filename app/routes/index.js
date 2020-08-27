const test = require('./test')

//dictionaries
const fillDictionary = require('./post/dictionaries/fillDictionary')
    //get
const getEventDict = require('./get/dictionaries/eventsDict')
const getGenderDict = require('./get/dictionaries/gendersDict')
const getNotDict = require('./get/dictionaries/notsDict')
const getSporttDict = require('./get/dictionaries/sportsDict')

//users
const register = require('./post/account/register')
const actAccount = require('./post/account/act-account')
const authorize = require('./post/account/authorize')
const updateInf = require('./post/users/updateInf')
    //get
const getUser = require('./get/users/user')

//sections
const createSection = require('./post/sections/createSection')
const updateSection = require('./post/sections/updateSection')
const deleteSection = require('./post/sections/deleteSection')
    //get
const getSection = require('./get/sections/get_section')

//age-types
const createAT = require('./post/age-types/createAT')
const updateAT = require('./post/age-types/updateAT')
const deleteAT = require('./post/age-types/deleteAT')
    //get
const getAT = require('./get/groups/get_at')

//groups
const createGroup = require('./post/groups/createGroup')
const updateGroup = require('./post/groups/updateGroup')
const deleteGroup = require('./post/groups/deleteGroup')
const createInvitation = require('./post/groups/createInvitation')
const inviteTrainer = require('./post/groups/inviteTrainer')
const becomeTrainer = require('./post/groups/becomeTrainer')
const useInvitation = require('./post/groups/useInvitation')
    //get
const getGroup = require('./get/groups/get_group')
const getInvTrainers = require('./get/groups/get_itrainers')
const getInvitation = require('./get/groups/get_invitations')

//events
const createEvent = require('./post/events/createEvent')
const updateEvent = require('./post/events/updateEvent')
const deleteEvent = require('./post/events/deleteEvent')
    //get
const getEvent = require('./get/events/get_event')
const getEvents = require('./get/events/get_group_events')
const getSectionsEvents = require('./get/events/get_sections_events')

//news
const createNews = require('./post/news/createNews')
const updateNews = require('./post/news/updateNews')
const deleteNews = require('./post/news/deleteNews')
    //get
const getNews = require('./get/news/get_news')
const getNewsParam = require('./get/news/get_news_filter')

//notifications
const createNot = require('./post/notifications/createNot')
const updateNot = require('./post/notifications/updateNot')
const deleteNot = require('./post/notifications/deleteNot')
    //get
const getNot = require('./get/notifications/get_notification')
const getNotEvents = require('./get/notifications/get_not_events')
const getAllNots = require('./get/notifications/get_all_not')
const getAllEventNots = require('./get/notifications/get_event_all_not')
const getMyNots = require('./get/notifications/get_my_nots')

module.exports = function(app, db, models, jsonParser, nodemailer) {

    test(app, models, jsonParser)

    //dictionaries
    fillDictionary(app, models, jsonParser)
    getEventDict(app, models)
    getGenderDict(app, models)
    getNotDict(app, models)
    getSporttDict(app, models)

    //user
    register(app, models, jsonParser, nodemailer)
    actAccount(app, models, jsonParser, nodemailer)
    authorize(app, models, jsonParser)
    updateInf(app, models, jsonParser)
    getUser(app, models)

    //sections
    createSection(app, models, jsonParser)
    updateSection(app, models, jsonParser)
    deleteSection(app, models, jsonParser)
    getSection(app, db, models)

    //age-types
    createAT(app, models, jsonParser)
    updateAT(app, models, jsonParser)
    deleteAT(app, models, jsonParser)
    getAT(app, models)

    //groups
    createGroup(app, models, jsonParser)
    updateGroup(app, models, jsonParser)
    deleteGroup(app, models, jsonParser)
    createInvitation(app, models, jsonParser)
    inviteTrainer(app, models, jsonParser)
    becomeTrainer(app, models, jsonParser)
    getInvTrainers(app, models)
    useInvitation(app, models, jsonParser)
    getGroup(app, models)
    getInvitation(app, models)

    //events
    createEvent(app, models, jsonParser)
    updateEvent(app, models, jsonParser)
    deleteEvent(app, models, jsonParser)
    getEvent(app, models)
    getEvents(app, db)
    getSectionsEvents(app, db)

    //news-notes
    createNews(app, models, jsonParser)
    updateNews(app, models, jsonParser)
    deleteNews(app, models, jsonParser)
    getNews(app, models)
    getNewsParam(app, models)

    //notifications
    createNot(app, models, jsonParser)
    updateNot(app, models, jsonParser)
    deleteNot(app, models, jsonParser)
    getNot(app, models)
    getNotEvents(app, db)
    getAllNots(app, db)
    getAllEventNots(app, db)
    getMyNots(app, models)
}