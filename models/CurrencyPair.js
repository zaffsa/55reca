const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const CurrencyPair = sequelize.define('CurrencyPair', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    buyRate: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    sellRate: {
        type: DataTypes.FLOAT,
        allowNull: true  
    },
    liquidity: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    fee:{   
        type: DataTypes.FLOAT,
        allowNull: true
    }
});
//sequelize.sync({ force: true });
module.exports = CurrencyPair;
