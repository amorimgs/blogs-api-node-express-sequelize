const express = require('express');
const userControler = require('./controlers/userControler');

// ...

const app = express();
app.use(express.json());

// não remova ou mova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.post('/login', userControler.login);
app.post('/user', userControler.newUser);

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
