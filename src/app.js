const express = require('express');
const userControler = require('./controlers/userControler');
const validateMiddleware = require('./middlewares/ValidateTokenMiddleware');

// ...

const app = express();
app.use(express.json());

// não remova ou mova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.post('/login', userControler.login);
app.post('/user', userControler.newUser);
app.get('/user', validateMiddleware.validateToken, userControler.getAllUsers);

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
