const User = require('../models/User');
const Account = require('../models/Account');

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.userId, {
      include: Account,
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
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
