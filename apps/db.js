import dotenv from "dotenv";
import Sequelize from 'sequelize';

dotenv.config();
export const sequelize = new Sequelize(process.env.DATABASENAME, process.env.DATABASEUSERNAME, process.env.DATABASEPASSWORD, {
    host: 'localhost',
    dialect: 'mysql'
});

