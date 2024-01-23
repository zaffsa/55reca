// config/database.js
const { Sequelize } = require('sequelize');
require('dotenv').config();

// Use as credenciais do arquivo config.env
const sequelize = new Sequelize({
  host: 'br994.hostgator.com.br',
  port: 3306,
  dialect: 'mysql',
  username: 'ffivep56_samir',
  password: 'Semprejuntos',
  database: 'ffivep56_usuarios',  
});

module.exports = sequelize;
#faça codigo