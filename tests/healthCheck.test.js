import request from 'supertest';
import { sequelize } from '../apps/db.js';
import {server} from '../server.js';

describe('Health Check API Tests', () => {

    afterAll((done) => {
        server.close(done);
    });  

  it('Return 200 OK when connection established', async () => {
    const response = await request(server).get('/healthz');
    expect(response.status).toBe(200);
  });

  it('Return 503 Service Unavailable for failed connection', async () => {
    jest.spyOn(sequelize, 'authenticate').mockImplementation(() => {
      throw new Error('Connection failed');
    });
    const response = await request(server).get('/healthz');
    expect(response.status).toBe(503);
    jest.restoreAllMocks();
  });

  it('Return 400 Bad Request for a request with payload', async () => {
    const response = await request(server).get('/healthz').send({ payload: 'data' });
    expect(response.status).toBe(400);
  });

  it('Return 405 Method Not Allowed for a non-GET request', async () => {
    const response = await request(server).post('/healthz');
    expect(response.status).toBe(405);
  });
});
