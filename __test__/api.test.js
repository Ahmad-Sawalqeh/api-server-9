'use strict';

const { server } = require('../lib/server.js');
const supergoose = require('@code-fellows/supergoose');
const mockRequest = supergoose(server);

describe('Categoris API', () => {
  it('post a new category', () => {
    let obj = { name: 'testCategory', display_name: 'cool-category', description: 'not for sale' };
    return mockRequest
      .post('/api/v1/categories')
      .send(obj)
      .then(data => {
        let record = data.body;
        Object.keys(obj).forEach(key => {
          expect(record[key]).toEqual(obj[key]);
        });
      });
  });

  it('get category items', () => {
    return mockRequest
      .get('/api/v1/categories')
      .then(data => {
        expect(data.status).toBe(200)
        expect(typeof data.body).toMatch('object')
      })
  })

  it('get one category item', () => {
    let obj = { name: 'one' };
    return mockRequest
      .post('/api/v1/categories')
      .send(obj)
      .then(data => {
        return mockRequest.get(`/api/v1/categories/${data.body._id}`)
          .then(data => {
            let record = data.body[0];
            Object.keys(obj).forEach(key => {
              expect(record[key]).toEqual(obj[key])
            })
          })
      })
  });

  it('update category', () => {
    let obj = { name: 'rrrrr' };
    return mockRequest
      .post('/api/v1/categories')
      .send(obj)
      .then(data => {
        return mockRequest.put(`/api/v1/categories/${data.body._id}`)
          .send({ name: 'UPDATED' })
          .then(results => {
            expect(results.status).toBe(200);
            expect(results.body.name).toEqual('TEST IS UPDATED');
          });
      });
  });

  it('delete one category', () => {
    let obj = { name: 'ssss' };
    return mockRequest
      .post('/api/v1/categories')
      .send(obj)
      .then(data => {
        return mockRequest
          .delete(`/api/v1/categories/${data.body._id}`)
          .send(obj)
          .then(() => {
            return mockRequest.get(`/api/v1/categories/${data.body._id}`)
              .then(results => {
                expect(results.status).toBe(200);
                expect(results.body[0]).toBe();
              });
          });
      });
  })

});

describe('Products API', () => {
  it('post a new product', () => {
    let obj = { name: 'testProduct' };
    return mockRequest
      .post('/api/v1/products')
      .send(obj)
      .then(data => {
        let record = data.body;
        Object.keys(obj).forEach(key => {
          expect(record[key]).toEqual(obj[key]);
        });
      });
  });

  it('get product items', () => {
    return mockRequest
      .get('/api/v1/products')
      .then(data => {
        expect(data.status).toBe(200)
        expect(typeof data.body).toMatch('object')
      })
  })

  it('get one product item', () => {
    let obj = { name: 'one' };
    return mockRequest
      .post('/api/v1/products')
      .send(obj)
      .then(data => {
        return mockRequest.get(`/api/v1/products/${data.body._id}`)
          .then(data => {
            let record = data.body[0];
            Object.keys(obj).forEach(key => {
              expect(record[key]).toEqual(obj[key])
            })
          })
      })
  });

  it('update product', () => {
    let obj = { name: 'rrrrr' };
    return mockRequest
      .post('/api/v1/products')
      .send(obj)
      .then(data => {
        return mockRequest.put(`/api/v1/products/${data.body._id}`)
          .send({ name: 'UPDATED' })
          .then(results => {
            expect(results.status).toBe(200);
            expect(results.body.name).toEqual('TEST IS UPDATED');
          });
      });
  });

  it('delete one product', () => {
    let obj = { name: 'ssss' };
    return mockRequest
      .post('/api/v1/products')
      .send(obj)
      .then(data => {
        return mockRequest
          .delete(`/api/v1/products/${data.body._id}`)
          .send(obj)
          .then(() => {
            return mockRequest.get(`/api/v1/products/${data.body._id}`)
              .then(results => {
                expect(results.status).toBe(200);
                expect(results.body[0]).toBe();
              });
          });
      });
  })
});