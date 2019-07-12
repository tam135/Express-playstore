const expect = require('chai').expect;
const request= require('supertest');
const app = require('../app');

describe('Get /apps', () => {
    it('should return an array of apps', () => {
        return request(app)
            .get('/apps')
            .expect(200)
            .expect('Content-Type', /json/)
            .then(res => {
                expect(res.body).to.be.an('array')
                expect(res.body).to.have.lengthOf.at.least(1)
                const apps = res.body[0]
                expect(apps).to.include.all.keys('App', 'Android Ver', 'Category', 'Rating', 'Size', 'Installs', 'Type', 'Price', 'Content Rating', 'Genres', 'Last Updated' )
                
            })
    })
    
    it('should be 400 if sort is incorrect', () => {
        return request(app)
            .get('/apps')
            .query({sort: 'MISTAKE'})
            .expect(400, 'Sort must be one of rating or app');
    });

    it('should be 400 if genre type is incorrect', () => {
        return request(app)
            .get('/apps')
            .query({genres: 'MISTAKE'})
            .expect(400, 'Must include a valid genre: Action, Puzzle, Strategy, Casual, Arcade or Card.');
    })


}) 