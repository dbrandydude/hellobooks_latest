const Book = require('../db/models').Book;

/* Add book */
const create = (req, res) => {
    return Book
        .create({
            title: req.body.title,
            author: req.body.author
        })
        .then(book => {
            res.status(201).send({ status: 'success', data: book });
        })
        .catch(err => {
            res.status(400).send({ status: 'error', data: err });
        });
};

module.exports = {
    create
};
