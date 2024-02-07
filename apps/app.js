import express from 'express';
import registerRouter from './routes/index.js';
import {sequelize} from './db.js';

export const initialize = (app) => {
    app.use(express.json());
    //dotenv.config();
    sequelize.sync({alter : true});
    registerRouter(app);
}

