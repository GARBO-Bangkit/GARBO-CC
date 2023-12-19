/* eslint-disable max-len */
require('dotenv').config();
const {checkIfExists, insertUser} = require('./functions/database.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Connection configuration

const secretKey = process.env.SECRET_KEY;

const register = async (request, h) => {
  const {name, username, email, password} = request.payload;

  // Check if the username already exists
  try {
    const userExists = await checkIfExists(username);
    const emailExists = await checkIfExists(email);
    if (userExists != null || emailExists != null) {
      return h.response('Username or email is already in use.').code(400);
    }
  } catch (error) {
    console.error('Error checking user:', error);
    return h.response('An error occurred while checking the user.').code(500);
  }
  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Store the user in the "database"
  const userData = {
    name: name,
    username: username,
    email: email,
    password: hashedPassword,
    point: 0,
  };

  // TRY TO INSERT DATA TO DATABASE
  try {
    insertUser(userData);
  } catch (error) {
    return h.response('Data failed to input. Server down').code(400);
  }

  return h.response('Registration successful').code(201);
};

const login = async (request, h) => {
  const {username, password} = request.payload;

  // Find the user in the "database"
  const user = await (checkIfExists(username));
  if (!user) {
    return h.response('invalid username/email or password').code(400);
  }

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    return h.response('Invalid username or password').code(401);
  }
  // Create and sign a JWT token
  // masih pakai username untuk loginnya
  const token = jwt.sign({username: user.username}, secretKey, {expiresIn: '1d'});

  return {token};
};

module.exports = {register, login};
