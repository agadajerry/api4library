
import supertest from 'supertest'
import app from '../app'


//test for GET
describe('GET /aboutbook/1', () => {
  test('GET /aboutbook/1', (done) => {
    supertest(app)
      .get('/aboutbook/1')
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
  test('PUT /aboutbook/1', (done) => {
    supertest(app)
      .put(`/aboutbook/1`)
      .expect('Content-Type', /json/)
      .send({
        Title: "PHP Programming Course",
        Author: "Francisco Mendes",
        datePublished: "Jul 19",
        description: "My love is here",
        pageCount: 1000,
        Genre: "PHP",
        bookId: 1,
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


//   // //test for post
  test('POST /books', (done) => {
    supertest(app)
      .post('/books')
      .expect('Content-Type', /json/)
      .send({
        Title: "PHP Programming Course",
        Author: "Francisco Mendes",
        datePublished: "Jul 19",
        description: "My love is here",
        pageCount: 1000,
        Genre: "PHP",
        bookId: 1,
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

//   //test for delete
  test('DELETE /delete/1', (done) => {
    supertest(app)
      .delete('/delete/1')
      .expect('Content-Type', /json/)
      .send({
        Title: "PHP Programming Course",
        Author: "Francisco Mendes",
        datePublished: "Jul 19",
        description: "My love is here",
        pageCount: 1000,
        Genre: "PHP",
        bookId: 1,
        Publisher: "jA",
      })
      .expect(200)
      .expect((res) => {
      })
      .end((err, res) => {
        if (err) return done(err)
        return done()
      })
 })
