const router = require('express').Router();

const passport = require('../auth/passport');
const bookController = require('../controllers/books');
const userController = require('../controllers/users');

/* POST user signup */
router.post('/users/signup', userController.create);

/* POST user login */
router.post('/users/signin', userController.login);

/* POST add book */
router.post('/books', bookController.create);

/* PUT modify book */
router.put('/books/:bookId', bookController.update);

/* GET retrieve all books */
router.get('/books', bookController.retrieveAll);

/* GET retrieve single book */
router.get('/books/:bookId', bookController.retrieve);

module.exports = router;
