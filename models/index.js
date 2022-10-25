const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];
const Users = require('./users');
const Board = require('./board');
const Hashtag = require('./hashtag');

const db = {};
const sequelize = new Sequelize(
  config.database, config.username, config.password, config,
);

db.sequelize = sequelize;
db.Users = Users;
db.Board = Board;
db.Hashtag = Hashtag;

Users.init(sequelize);
Board.init(sequelize);
Hashtag.init(sequelize);

Users.associate(db);
Board.associate(db);
Hashtag.associate(db);

module.exports = db;
