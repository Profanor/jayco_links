const User = require('../models/User');
const Account = require('../models/Account');
const { generateToken } = require('../utils/jwt'); 

exports.createUser = async (req, res) => {
  try {
    const { name, email, initialBalance } = req.body;

    // Create a new user
    const user = await User.create({ name, email });

    // Create an account for the user
    const account = await Account.create({
      userId: user.id,
      balance: initialBalance || 0, 
    });

    // Generate a token for the user
    const token = generateToken(user);

    res.status(201).json({
      message: 'User created successfully',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        balance: account.balance,
      },
      token,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      include: Account,
    });

    if (!users.length) {
      return res.status(404).json({ message: 'No users found' });
    }

    // Map the user data to include only relevant information
    const userData = users.map(user => ({
      id: user.id,
      name: user.name,
      email: user.email,
      balance: user.Account ? user.Account.balance : null,
    }));

    res.status(200).json(userData);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.userId, {
      include: Account,
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!user.Account) {
      return res.status(404).json({ message: 'Account not found for this user' });
    }

    res.status(200).json({
      name: user.name,
      email: user.email,
      balance: user.Account.balance,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
