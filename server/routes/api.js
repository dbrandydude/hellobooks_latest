const router = require('express').Router();

const authHelper = require('../auth/_helper');
const passport = require('../auth/passport');
const bookController = require('../controllers/books');
const userController = require('../controllers/users');

/* POST user signup */
router.post('/users/signup', userController.create);

/* POST add book */
router.post('/books', bookController.create);

/* PUT modify book */
router.put('/books/:bookId', bookController.update);

module.exports = router;
