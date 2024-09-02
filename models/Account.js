const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

const Account = sequelize.define('Account', {
  balance: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0,
  },
});

Account.belongsTo(User);
User.hasOne(Account);

module.exports = Account;
