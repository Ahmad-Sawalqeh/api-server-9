/* eslint-disable strict */
'use strict';

// const notFoundHandler = require('../middleware/404.js');
// const errorHandler = require('../middleware/500.js');
// const supertest = require('supertest');
// const mockRequestNotFound = supertest(notFoundHandler);
// const mockRequestEerrorHandler = supertest(errorHandler);

const { server } = require('../lib/server.js');
const supergoose = require('@code-fellows/supergoose');
const mockRequest = supergoose(server);
// const mockRequest = supertest(server);

describe('testing middleware', () => {

  it('testing error 500 ', () => {
    return mockRequest
      .get('/api/v1/error')
      .then(response => {
        expect(response.status).toEqual(500);
      });
  });

  it('testing not found route 404 ', () => {
    return mockRequest
      .get('/main')
      .then(data => {
        expect(data.status).toBe(404);
      });
  });

});