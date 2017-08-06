const bcrypt = require('bcryptjs');
const passport = require('passport');

const User = require('../db/models').User;

/* Register/ create user account */
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

/* Login user */
const login = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) return next(err);
        if (!user) {
            return res.status(500).send({
                status: 'Invalid credentials'
            });
        }
        req.login(user, (err) => {
            if (err) return next(err);
            return res.status(200).send({
                status: 'success',
                data: user
            });
        });
    })(req, res, next);
};

module.exports = {
    create,
    login
};
