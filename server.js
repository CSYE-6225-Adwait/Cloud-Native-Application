import express from 'express';
import {initialize} from './apps/app.js';

const app = express();
const port = 3000;
initialize(app);
export const server = app.listen(port, () => console.log('Server is listening at port 3000'));