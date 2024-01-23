const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const PixQrCode = sequelize.define('PixQrCode', {
    description: DataTypes.STRING,
    value: DataTypes.DECIMAL(10, 2),
    addressKey: DataTypes.STRING,
    expirationDate: DataTypes.DATE,
    qrCodePayload: DataTypes.TEXT,
    encodedImage: DataTypes.TEXT,
    userId: DataTypes.INTEGER
});

// Não é recomendado usar { force: true } em produção, pois recriará as tabelas
// Apenas use { force: true } durante o desenvolvimento
// Comente ou remova a linha abaixo em produção


module.exports = PixQrCode;
