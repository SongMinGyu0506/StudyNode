const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            name: {
                type: Sequelize.STRING(20),
                allowNull: false,
                unique: true,
            },
            age: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false,
            },
            married: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
            },
            comment: {
                type: Sequelize.TEXT,
                allowNull:true,
            },
            create_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW,
            },
        },{
            sequelize,
            timestamps:false, //자동으로 createAt와 updateAt 컬럼 추가
            underscored:false, // 네이밍 컨벤션
            modelName:'User', // 테이블이랑 연결할 이름
            tableName:'users', // 테이블 이름
            paranoid:false, // 삭제시 데이터 삭제 대신 삭제 기록만 추가하고 접근불가
            charset:'utf8',
            collate:'utf8_general_ci',
        });
    }
    //관계형 컬럼 추가하는 공간
    static associate(db) {
        //1:N에서 1의 위치에서 hasMany 사용
        db.User.hasMany(db.Comment,{foreignKey:'commenter',sourceKey:'id'});

        //1:1 관계에서
        //db.User.hasOne(db.Comment,{foreignKey:'commenter',sourceKey:'id'});
    }
};