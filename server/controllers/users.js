const bcrypt = require('bcryptjs');
const User = require('../db/models').User;

const create = (req, res) => {
    return User
        .create({
            username: req.body.username,
            password: bcrypt.hashSync(req.body.password, 8)
        })
        .then(user => {
            res.status(200).send({ status: 'success', data: user });
        })
        .catch(err => res.status(500).send({
            status: 'error',
            data: err
        }));
};

module.exports = {
    create
};
