const Sequelize = require('sequelize');
const db = require('../config/db');

const Messages = db.define('messages',{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: Sequelize.STRING,
    msj: Sequelize.STRING

},{
    tableName: 'messages',
    timestamps:true
});
module.exports = Messages;
