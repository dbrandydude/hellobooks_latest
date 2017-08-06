const router = require('express').Router();

const bookController = require('../controllers/books');

/* POST add book */
router.post('/books', bookController.create);

/* PUT modify book */
router.put('/books/:bookId', bookController.update);

module.exports = router;
