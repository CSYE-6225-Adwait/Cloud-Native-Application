import express from 'express';
import registerRouter from './routes/index.js';
import {sequelize,initializeDatabase} from './db.js';

export const initialize = async (app) => {
    app.use(express.json());
    //dotenv.config();
    await initializeDatabase();
    await sequelize.sync({alter : true});
    registerRouter(app);
}

