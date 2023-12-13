/* eslint-disable linebreak-style */
// const { deleteNoteByIdHandler } = require('./handler');
// const { editNoteByIdHandler } = require('./handler');
// const { getNoteByIdHandler } = require('./handler');
// const { addNoteHandler, getAllNotesHandler } = require('./handler');

const routes = [
  {
    method: 'GET',
    path: '/login',
    handler: getAuthentication,
  },
  {
    method: 'GET',
    path: '/register',
    handler: createUser,
  },
  {
    method: 'POST',
    path: '/send',
    handler: sendPicture,
  },
  {
    method: 'GET',
    path: '/result',
    handler: getResult,
  },
  {
    method: 'DELETE',
    path: '/notes/{id}',
    handler: deleteNoteByIdHandler,
  },
];

module.exports = routes;
