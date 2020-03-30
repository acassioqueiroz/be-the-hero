const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../database/connection');


describe('ONG', () => {
    beforeEach(async () => {
       await connection.migrate.rollback();
       await connection.migrate.latest();
    });

    afterAll(async () => {
        await connection.destroy();
    });

    it('should be able to create a new ONG', async () => {
        const response = await request(app)
        .post('/ongs')
        .send({ 
            name: "APAD9",
            email: "contato@apad9.com",
            whatsapp: "71912345678",
            city:  "Rio do Sul",
            uf: "SC"            
        });
        console.log(response.body);
        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    });
});