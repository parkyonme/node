const Sequelize =require('sequelize');

module.exports = class Users extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            // UID:{
            //     type:Sequelize.INTEGER,
            //     allowNull:false,
            //     primaryKey: true,
            // },
            email:{
                type: Sequelize.STRING,
                allowNull:false,
                unique:true,
            },
            password:{
                type:Sequelize.STRING,
                allowNull:false,
            },
            // Name:{
            //     type: Sequelize.STRING,
            //     allowNull:false,
            // },
            nick:{
                type: Sequelize.STRING,
                allowNull:false,
            },
            // BirthDay:{
            //     type: Sequelize.DATE,
            //     allowNull: false,
            // },
            // Salt:{
            //     type: Sequelize.STRING,
            // },
        },{
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'Users',
            tableName: 'Users',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
    static associate(db){
        db.Users.hasMany(db.Board);
        db.Users.belongsToMany(db.Users,{
            foreignKey: 'followingId',
            as: 'Followers',
            through: 'Follow',
        });
        db.Users.belongsToMany(db.Users,{
            foreignKey: 'followerId',
            as: 'Followings',
            through: 'Follow',
        });
    }

};