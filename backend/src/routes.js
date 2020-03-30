const express = require('express');
const ongCreate = require('./controllers/OngController')
const IncidentController = require('./controllers/IncidentController')
const ProfileController = require('./controllers/ProfileController')
const SessionController = require('./controllers/SessionController')
const { celebrate, Segments, Joi } = require("celebrate");
const routes = express.Router();

routes.post('/session',SessionController.create);

routes.get('/ongs', ongCreate.index);

routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(11),
        city: Joi.string().required(),
        uf: Joi.string().required().min(2).max(2)
    })
}), ongCreate.create);
//routes.delete('/ongs', ongCreate.delete);

routes.get('/incidents', celebrate ({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown()
}), IncidentController.index);
routes.post('/incidents', IncidentController.create);
routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
    })
}), IncidentController.delete);

routes.get('/profile',celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number()
    })
}),ProfileController.index);




module.exports = routes;
