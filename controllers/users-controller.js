const HttpError = require('../models/http-error');
const { uuid } = require('uuidv4');

const DUMMY_USERS = [
  {
    id: 'u1',
    name: 'Rodrigo',
    email: 'email@email.com',
    password: 'tester',
  },
];

const getUsers = (req, res, next) => {
  res.json({ users: DUMMY_USERS });
};

const signUp = (req, res, next) => {
  const { name, email, password } = req.body;

  const hasUser = DUMMY_USERS.find((u) => u.email === email);
  if (hasUser) {
    throw new HttpError('Could not create user, email already exists', 422);
  }
  const createdUser = {
    id: uuid(),
    name,
    email,
    password,
  };

  DUMMY_USERS.push(createdUser);

  res.status(201).json({ user: createdUser });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  const identifiedUser = DUMMY_USERS.find((u) => u.email === email);

  if (!identifiedUser || identifiedUser.password !== password) {
    throw new HttpError(
      'Could not identify user, credentials seems to be wrong',
      404
    );
  }

  res.json({ message: 'Logged in' });
};

exports.getUsers = getUsers;
exports.signUp = signUp;
exports.login = login;