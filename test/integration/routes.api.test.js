// process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const server = require('../../server/app');
const models = require('../../server/db/models');

describe('routes: users', () => {

    describe('POST /api/books', () => {
        it('should respond with a success along with newly created book', (done) => {
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

    describe('PUT /api/books/:bookId', () => {
        it('should respond with a success along with modified book', (done) => {
            models.Book
                .all()
                .then(books => {
                    const bookObj = books[0];
                    chai.request(server)
                    .put(`/api/books/${bookObj.id}`)
                    .send({ title: 'updatedTitle', author: 'updatedAuthor' })
                    .end((err, res) => {
                        // there should be no error
                        should.not.exist(err);
                        // there should be a 201 status code
                        // indicating that user was created
                        res.status.should.equal(200);
                        // response should be JSON
                        res.type.should.equal('application/json');
                        // JSON response body should have key-value pair
                        // { "data": "success" }
                        res.body.status.should.eql('success');

                        // let ensure the book was in indeed updated
                        let newBookObj = res.body.data[0];
                        newBookObj.title.should.not.eql(bookObj.title);
                        newBookObj.author.should.not.eql(bookObj.author);
                        // confirm new values
                        newBookObj.title.should.eql('updatedTitle');
                        newBookObj.author.should.eql('updatedAuthor');
                        done();
                });

            });
        });
    });

});
