const express = require('express');
const ongCreate = require('./controllers/OngController')
const IncidentController = require('./controllers/IncidentController')
const ProfileController = require('./controllers/ProfileController')
const SessionController = require('./controllers/SessionController')

const routes = express.Router();

routes.post('/session',SessionController.create);

routes.get('/ongs', ongCreate.index);
routes.post('/ongs', ongCreate.create);
//routes.delete('/ongs', ongCreate.delete);

routes.get('/incidents', IncidentController.index);
routes.post('/incidents', IncidentController.create);
routes.delete('/incidents/:id', IncidentController.delete);

routes.get('/profile',ProfileController.index)




module.exports = routes;
