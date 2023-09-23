const server = require('../src/server');
const session = require('supertest');
const request = session(server);

describe('Test de RUTAS', () => {

    describe('GET /drivers/:id', () => {

        it('Responde con status: 200', async () => {
            const response = await request.get('/drivers/5');
            expect(response.statusCode).toBe(200);
        })

        it('Responde un objeto con las propiedades: "id", "forename", "surname", "teams", "nationality", "dob" e "image"' , async () => {
            const response = await request.get('/drivers/5');
            expect(response.body).toHaveProperty("id");
            expect(response.body).toHaveProperty("forename");
            expect(response.body).toHaveProperty("surname");
            expect(response.body).toHaveProperty("teams");
            expect(response.body).toHaveProperty("nationality");
            expect(response.body).toHaveProperty("dob");
            expect(response.body).toHaveProperty("image");
            expect(response.body).toHaveProperty("description");
        })

        it('Si hay un error responde con status: 500' , async () => {
            const response = await request.get('/drivers/9999');
            expect(response.statusCode).toBe(500);
        })
    })

    describe('POST /drivers/', () => {

        it('Agrega un driver a la base de datos', async () => {
            const driver = {
                
                forename: 'Lucas',
                surname: 'Fittipaldi ',
                teams: 'BMW',
                nationality: 'Colombian',
                dob: '1988-07-30',
                image: 'https://www.eltiempo.com/files/article_main/uploads/2021/09/16/614328247390e.jpeg',
                description: 'Un piloto de Colombia'
             }

            const response = await request.post('/drivers/')
            .send(driver);  
            expect(response.body).toHaveProperty("id");

        })

    })

})