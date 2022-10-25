const Sequelize =require('sequelize');

module.exports = class Hashtag extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            Tag:{
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
            },
        },{
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'Hashtag',
            tableName: 'Hashtag',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }
    static associate(db){
        db.Hashtag.belongsToMany(db.Board, { through: 'BoardHashtag'});
    }

};