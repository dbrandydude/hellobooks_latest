// process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const server = require('../../server/app');
const models = require('../../server/db/models');

describe('routes: users', () => {

    describe('POST /api/books', () => {
        it('should respond with a success along with newly created user', (done) => {
            chai.request(server)
            .post('/api/books')
            .send({ title: 'Andela BootCamp', author: 'Carter' })
            .end((err, res) => {
                // there should be no error
                should.not.exist(err);
                // there should be a 201 status code
                // indicating that user was created
                res.status.should.equal(201);
                // response should be JSON
                res.type.should.equal('application/json');
                // JSON response body should have key-value pair
                // { "data": "success" }
                res.body.status.should.eql('success');
                // JSON response body should have key-value pair
                // { "data": [1 book object] }
                res.body.data.should.include.keys(
                    'id', 'title', 'author', 'createdAt', 'updatedAt'
                );
                done();
            });
        });
    });

});
