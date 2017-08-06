/* eslint no-unused-vars: ["error", { "args": "none" }] */

module.exports = (sequelize, DataTypes) => {
    const Book = sequelize.define('Book', {
        title: DataTypes.STRING,
        author: DataTypes.STRING
    }, {
        classMethods: {
            associate: (models) => {
                // associations can be defined here
            }
        }
    });

    return Book;
};
