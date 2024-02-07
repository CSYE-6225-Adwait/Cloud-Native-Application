//import * as service from '../services/healthcheck-services.js';
import {sequelize} from '../db.js';
import {setResponseHeaders} from '../utils.js';

export const check = async (request, response) => {
    setResponseHeaders(response);
    try {
        await sequelize.authenticate();
        response.status(200).send();
      } catch (error) {
        response.status(503).send();
      }
}