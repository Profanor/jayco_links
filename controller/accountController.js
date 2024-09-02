const Account = require('../models/Account');


exports.deposit = async (req, res) => {
  try {
    const { userId, amount } = req.body;
    const account = await Account.findOne({ where: { UserId: userId } });
    account.balance += parseFloat(amount);
    await account.save();
    res.status(200).json({ message: 'Deposit successful', balance: account.balance });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.withdrawal = async (req, res) => {
  try {
    const { userId, amount } = req.body;
    const account = await Account.findOne({ where: { UserId: userId } });
    if (account.balance < amount) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }
    account.balance -= parseFloat(amount);
    await account.save();
    res.status(200).json({ message: 'Withdrawal successful', balance: account.balance });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
