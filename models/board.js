const Sequelize = require('sequelize');

module.exports = class Board extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            BID:{
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            UID: {
                allowNull: false,
                type: Sequelize.INTEGER
            },
            Location: {
                allowNull: false,
                type: Sequelize.STRING
            },
            Content: Sequelize.STRING,
            Star: Sequelize.INTEGER,
           
            img:{
                type: Sequelize.STRING,
                allowNull:true,
            },
        },{
            sequelize,
            timestamps:true,
            underscored:false,
            paranoid: false,
            modelName: 'Board',
            tableName: 'Board',
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
    static associate(db){
        db.Board.belongsTo(db.Users);
        db.Board.belongsToMany(db.Hashtag, {through: 'BoardHashtag'});
    }

};