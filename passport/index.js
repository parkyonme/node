const passport = require('passport');
const local = require('./localStrategy');
const Users = require('../models/users');

module.exports = () =>{
    passport.serializeUser((user, done) => {
        done(null, user.id)
    });

    passport.deserializeUser((id, done) => {
        Users.findOne({
            where: {id},
            include: [{
                model: Users,
                attributes:['id', 'nick'],
                as: 'Followers',
            },{
                model: Users,
                attributes: ['id', 'nick'],
                as: 'Followings',
            }],
        })
            .then(user => done(null, user))
            .catch(err => done(err));
    });
    local();
}