
import supertest from 'supertest'
import app from '../app'


// let book;
//test for GET
describe('GET /bookapi/book/1', () => {
  test('GET /bookapi/book/1', (done) => {
    // const response = await supertest(app).post('/books').send({
    //   title: "",
    //   author: ""
    // })

    // book = response.body.data
    supertest(app)
      .get(`/bookapi/book/1`)
      .expect('Content-Type', /json/)
      .expect(200)
      .expect((res) => {
        expect(res.body[0]).toHaveProperty('bookId')
        expect(res.status).toBe(200)
      })
      .end((err, res) => {
        if (err) return done(err)
        return done()
      })
  })
})

  //


  //test for put
  test('PUT /', (done) => {
    supertest(app)
      .put(`/bookapi/update/1`)
      .expect('Content-Type', /json/)
      .send({
        Title: "Solidity Course",
        Author: "Mba Mendes",
        datePublished: "Jul 2021",
        description: "Crypto space",
        pageCount: 300,
        Genre: "Jerry A",
        bookId: 2,
        Publisher: "jA"
      })
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('msg')
        expect(res.status).toBe(200)
      })
      .end((err, res) => {
        if (err) return done(err)
        return done()
      })
  })


// //   // //test for post
  test('POST /', (done) => {
    supertest(app)
      .post('/bookapi/post')
      .expect('Content-Type', /json/)
      .send({
        Title: "PHP Programming Course",
        Author: "Francisco Mendes",
        datePublished: "Jul 19",
        description: "My love is here",
        pageCount: 1000,
        Genre: "PHP",
        bookId: 32,
        Publisher: "jA",
      })
      .expect(201)
      .expect((res) => {
        expect(res.status).toBe(201)
        expect(res.body).toHaveProperty('bookId')
      })
      .end((err, res) => {
        if (err) return done(err)
        return done()
      })
  })

// //   //test for delete
  test('DELETE /', (done) => {
    supertest(app)
      .delete('/bookapi/delete/1')
      .expect('Content-Type', /json/)
      .send({
        Title: "PHP Programming Course",
        Author: "Francisco Mendes",
        datePublished: "Jul 19",
        description: "My love is here",
       
      })
      .expect(200)
      .expect((res) => {
      })
      .end((err, res) => {
        if (err) return done(err)
        return done()
      })
 })
