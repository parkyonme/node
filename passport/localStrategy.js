const passpost = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const Users = require('../models/users');
const passport = require('passport');

module.exports = () => {
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordFeild: 'password',
    }, async (email, password, done) => {
        try{
            const exUser = await Users.findOne({ where: {email}});
            if(exUser) {
                const result = await bcrypt.compare(password, exUser.password);
                if(result){
                    done(null, exUser);
                }else{
                    done(null, false, {message:'비밀번호가 일치하지 않습니다.'});
                }
            }else{
                done(null, false, {message:'가입되지 않은 회원입니다.'});
            }
        }catch (error) {
            console.error(error);
            done(error);
        }
    }));
};