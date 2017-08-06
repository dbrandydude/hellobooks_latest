'use strict';

module.exports = (sequelize, DataTypes) => {
    const Inventory = sequelize.define('Inventory', {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        book: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        return: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        }
    }, {
        classMethods: {
            associate: (models) => {
                Inventory.belongsTo(models.User, {
                    foreignKey: 'userId',
                    onDelete: 'CASCADE'
                });
            }
        }
    });

    return Inventory;
};
