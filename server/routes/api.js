const router = require('express').Router();

const bookController = require('../controllers/books');

/* GET home page. */
router.get('/books');

/* POST add book */
router.post('/books', bookController.create);

module.exports = router;
