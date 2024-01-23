        const { Model, DataTypes } = require('sequelize');
        const sequelize = require('../config/database'); // Certifique-se de que o caminho está correto

        class User extends Model {
            static associate(models) {
                // Associações podem ser definidas aqui
                User.hasMany(models.PixQrCode, { foreignKey: 'UserId' });
            }
        }

        User.init({
            UserId: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            },
            role: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: 'user'
            },
            balanceBRL: {
                type: DataTypes.DECIMAL(10, 8),
                allowNull: true,
                defaultValue: 0.00000000
            },
            balanceBTC: {
                type: DataTypes.DECIMAL(10, 8),
                defaultValue: 0.00000000,
                allowNull: true
            },
            balanceUSDT: {
                type: DataTypes.DECIMAL(10, 8),
                allowNull: true,
                defaultValue: 0.00000000
            }
        }, {
            sequelize,
            modelName: 'User'
        });

        // Sincroniza o modelo com o banco de dados
        // Use force: true com cautela, pois isso apagará e recriará tabelas
        //sequelize.sync({ force: true });

        module.exports = User;
