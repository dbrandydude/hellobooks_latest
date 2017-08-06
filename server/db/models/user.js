'use strict';

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        classMethods: {
            associate: (models) => {
                User.hasMany(models.Inventory, {
                    foreignKey: 'userId',
                    as: 'books'
                });
            }
        }
    });

    return User;
};
