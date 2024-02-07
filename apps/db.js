import dotenv from "dotenv";
import Sequelize from 'sequelize';
import mysql2 from 'mysql2/promise';

dotenv.config();
export const sequelize = new Sequelize(process.env.DATABASENAME, process.env.DATABASEUSERNAME, process.env.DATABASEPASSWORD, {
    host: 'localhost',
    dialect: 'mysql',
    dialectOptions: {
        useUTC: false, 
        dateStrings: true,
        typeCast: true
    },
    timezone: '-05:00'
});

const createDatabase = async () => {
    const connection = await mysql2.createConnection({
        host: 'localhost',
        user: process.env.DATABASEUSERNAME,
        password: process.env.DATABASEPASSWORD,
    });

    try {
        await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DATABASENAME}`);
        console.log(`Database ${process.env.DATABASENAME} created`);
    } catch (error) {
        console.error('Error creating the database');
    } finally {
        await connection.end();
    }
};

export const initializeDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection to the database has been established successfully.');
    } catch (error) {
        await createDatabase();
    }
};
