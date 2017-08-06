const Book = require('../db/models').Book;
const Inventory = require('../db/models').Inventory;

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

/* Get all books */
const retrieveAll = (req, res) => {
    return Book.all()
        .then(books => res.status(200).send({
            status: 'success',
            data: books
        }))
        .catch(err => res.status(400).send({
            status: 'error',
            data: err
        }));
};

/* GET single book */
const retrieve = (req, res) => {
    const id = parseInt(req.params.bookId);
    return Book.findById(id)
        .then(book => res.status(200).send({
            status: 'success',
            data: book
        }))
        .catch(err => res.status(400).send({
            status: 'error',
            data: err
        }));
};

/* Borrow book */
const borrow = (req, res) => {
    const userId = parseInt(req.params.userId);
    const bookId = req.body.bookId;

    Book.findById(bookId)
        .then(book => {
            return Inventory.create({
                userId,
                book: book.title
            })
            .then(inventory => res.status(200).send({
                status: 'success',
                data: inventory
            }));
        })
        .catch(err => res.status(400).send({
            status: 'error',
            data: err
        }));
};

module.exports = {
    create,
    update,
    retrieveAll,
    retrieve,
    borrow
};
