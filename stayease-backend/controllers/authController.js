const User = require('../models/User');
const generateToken = require('../utils/generateToken');

// @desc    Register a new user
exports.registerUser = async (request, reply) => {
  const { name, email, password, role } = request.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    reply.status(400).send({ message: 'User already exists' });
  }

  const user = await User.create({ name, email, password, role });

  reply.status(201).send({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    token: generateToken(user._id),
  });
};

// @desc    Auth user & get token
exports.authUser = async (request, reply) => {
  const { email, password } = request.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    reply.send({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    reply.status(401).send({ message: 'Invalid email or password' });
  }
};
