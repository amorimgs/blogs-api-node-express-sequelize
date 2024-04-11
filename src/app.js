const express = require('express');
const userControler = require('./controlers/userControler');
const categoryControler = require('./controlers/categoryControler');
const validateMiddleware = require('./middlewares/ValidateTokenMiddleware');

// ...

const app = express();
app.use(express.json());

// não remova ou mova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

// user Route
app.post('/login', userControler.login);
app.post('/user', userControler.newUser);
app.get('/user', validateMiddleware.validateToken, userControler.getAllUsers);
app.get('/user/:id', validateMiddleware.validateToken, userControler.getUserById);

// Category Route
app.post('/categories', validateMiddleware.validateToken, categoryControler.newCategory);

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
