const server = require('../src/server');
const session = require('supertest');
const request = session(server);
const fs = require('fs');

describe('Test de RUTAS', () => {

    describe('GET /drivers/:id', () => {

        it('Responde con status: 200', async () => {
            const response = await request.get('/drivers/5');
            expect(response.statusCode).toBe(200);
        })

        it('Responde un objeto con las propiedades: "id", "forename", "surname", "teams", "nationality", "dob" e "image"', async () => {
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

        it('Si hay un error responde con status: 500', async () => {
            const response = await request.get('/drivers/9999');
            expect(response.statusCode).toBe(500);
        })
    })

    describe('POST /drivers/', () => {

        it('Agrega un driver a la base de datos', async () => {
            const imageFilePath = 'C:\Users\Anderson\Desktop\Test Images\Luigi.png';
            fs.writeFileSync(imageFilePath, 'imagen_de_prueba');


            const driver = {

                forename: 'Lucas',
                surname: 'Fittipaldi ',
                teams: 'BMW',
                nationality: 'Colombian',
                dob: '1988-07-30',
                description: 'Un piloto de Colombia'
            }

            const response = await request.post('/drivers/')
                .field('forename', driver.forename)
                .field('surname', driver.surname)
                .field('teams', driver.teams)
                .field('nationality', driver.nationality)
                .field('dob', driver.dob)
                .field('description', driver.description)
                .attach('image', imageFilePath);
            expect(response.body).toHaveProperty("id");

        })

    })

})