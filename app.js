const express = require('express');
const sequelize = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const accountRoutes = require('./routes/accountRoutes');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use('/api', userRoutes);
app.use('/api', accountRoutes);


sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log('Server is running on port 4000');
  });
});
