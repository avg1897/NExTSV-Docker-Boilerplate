import {Sequelize} from 'sequelize-typescript';

import {User} from '../users/User';
import {Post} from "../posts/Post";

export const sequelize = new Sequelize({
    dialect: 'mysql',
    database: process.env.MYSQL_DATABASE,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    host: 'mysql_db',
    port: 3306,
    models: [User, Post],
});
