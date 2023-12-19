/* eslint-disable max-len */
const {login, register} = require('./handler');
const Joi = require('@hapi/joi');

const routes = [
  {
    method: 'POST',
    path: '/login',
    config: {
      auth: false,
      handler: login,
      validate: {
        payload: Joi.object({
          username: Joi.string().required(),
          password: Joi.string().required(),
        }),
      },
    },
  },
  {
    method: 'POST',
    path: '/register',
    config: {
      auth: false,
      handler: register,
      validate: {
        payload: Joi.object({
          name: Joi.string().required(),
          username: Joi.string().required(),
          email: Joi.string().required(),
          password: Joi.string().min(8).required(),
        }),
      },
    },
  },
  {
    method: 'POST',
    path: '/sendpicture',
    config: {
      auth: 'jwt',
      handler: function(request, h) {
        const response = h.response({message: 'You used a Valid JWT Token to access /restricted endpoint!'});
        response.header('Authorization', request.headers.authorization);
        return response;
      },
    },
  },
  // Additional routes here
];

module.exports = routes;
