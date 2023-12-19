import app from '../server'
import supertest from 'supertest'

describe('GET /',()=>{
    it('Should send back some data',async ()=>{
        const res = await supertest(app)
            .get("/")//Make a get request to root:  http://localhost:3001/

        expect(res.body.message).toBe('hello')
    })
})