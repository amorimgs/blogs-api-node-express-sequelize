const express = require('express');
const userControler = require('./controlers/userControler');
const categoryControler = require('./controlers/categoryControler');
const postControler = require('./controlers/postControler');
const validateMiddleware = require('./middlewares/ValidateTokenMiddleware');
const validateInputsNewPost = require('./middlewares/ValidateInputsNewPost');
const verifyUser = require('./middlewares/VerifyPostUser');
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
app.get('/categories', validateMiddleware.validateToken, categoryControler.getAllCategories);

// Post Route
app.post(
  '/post', 
  validateMiddleware.validateToken,
  validateInputsNewPost.newPost,
  postControler.newPost,
);
app.get('/post', validateMiddleware.validateToken, postControler.getAllPosts);
app.get('/post/:id', validateMiddleware.validateToken, postControler.getPostById);
app.put('/post/:id', validateMiddleware.validateToken, verifyUser.verify, postControler.updatePost);
app.delete(
  '/post/:id',
  validateMiddleware.validateToken,
  verifyUser.verify,
  postControler.deletePost,
);
// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
