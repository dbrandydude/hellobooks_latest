const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

const User = require('../db/models').User;

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => done(null, user))
        .catch(err => done(err, null));
});

passport.use(new LocalStrategy(
    (username, password, done) => {
        User.findOne({ where: { username } })
            .then(user => {
                if (!user) {
                    return done(null, false, { message: 'Incorrect user' });
                }
                if (!bcrypt.compareSync(password, user.password)) {
                    return done(null, false, { message: 'Incorrect password' });
                }

                return done(null, user);
            })
            .catch(err => { return done(err); });
    }
));
