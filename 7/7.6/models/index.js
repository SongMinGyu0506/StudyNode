'use strict';

// const fs = require('fs');
// const path = require('path');
const Sequelize = require('sequelize');
const User = require('./user');
const Comment = require('./comment');
// const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development'; //config.json 설정
//const config = require(__dirname + '/../config/config.json')[env];
const config = require('../config/config')[env];
const db = {};

// let sequelize;
// if (config.use_env_variable) {
//   sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
//   sequelize = new Sequelize(config.database, config.username, config.password, config);
// }

// fs
//   .readdirSync(__dirname)
//   .filter(file => {
//     return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
//   })
//   .forEach(file => {
//     const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
//     db[model.name] = model;
//   });

// Object.keys(db).forEach(modelName => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

// db.sequelize = sequelize;

//sequelize 패키지 생성자 config의 정보를 가져와서 구성
const sequelize = new Sequelize(config.database, config.username, config.password, config);

//db.Sequelize = Sequelize;
db.sequelize = sequelize; //연결 객체

// 연결 테이블
db.User = User;
db.Comment = Comment;



User.init(sequelize);
Comment.init(sequelize);

User.associate(db);
Comment.associate(db);

module.exports = db;
