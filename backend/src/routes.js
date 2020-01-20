const { Router } = require('express');
const DevControler = require('./controllers/DevController');
const SearchController = require('./controllers/SearchController');
const routes = Router();

routes.get('/devs', DevControler.index);
routes.post('/devs', DevControler.store);
routes.get('/search', SearchController.index);

module.exports = routes;