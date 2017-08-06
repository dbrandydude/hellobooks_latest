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

/* Update book */
const update = (req, res) => {
    const bookId = parseInt(req.params.bookId),
        title = req.body.title,
        author = req.body.author;

    return Book
        .findById(bookId)
        .then(book => {
            if (!book) {
                res.status(404).send({
                    status: 'Not found'
                });
            }
            return book
                .update({ title, author })
                .then(() => {
                    res.status(200).send({ status: 'success'});
                })
                .catch(err => res.status(400).send(err));
        });
};

module.exports = {
    create,
    update
};
