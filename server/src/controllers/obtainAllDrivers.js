const URL = "http://localhost:5000/drivers";
const axios = require('axios');
const { Driver, Teams } = require('../db');

const obtainAllDrivers = async () => {

    try {

        const { data } = await axios.get(`${URL}`)
        if (!data) throw new Error("No drivers were found");

        const apiDrivers = data.map((driver) => {

            const { id, name, image, dob, nationality, teams, description } = driver;
            const placeholderImage = "https://img.remediosdigitales.com/acd470/kubica-barcelona-f1-2020/1366_2000.jpg";

            return {
                id,
                forename: name.forename,
                surname: name.surname,
                image: image.url === "" ? placeholderImage : image.url,
                dob,
                nationality,
                teams,
                description,
            }
        })

        const DBDrivers = await Driver.findAll({
            include: [{
                model: Teams,
                attributes: ['name'], //Get only the 'name' attribute from Teams.
            }],
        });

        if (!DBDrivers.length) {

            return apiDrivers;
        }
        const DBDriversWithTeams = await DBDrivers.map(driver => {
            const teamsNames = driver.Teams.map(team => team.name).join(", ");

            return {
                id: driver.id,
                forename: driver.forename,
                surname: driver.surname,
                image: driver.image,
                nationality: driver.nationality,
                dob: driver.dob,
                teams: teamsNames,
                description: driver.description

            };
        })

        const allDrivers = [...apiDrivers, ...DBDriversWithTeams];
        return allDrivers;

    } catch (error) {
        throw new Error(error.message);
    }

}

module.exports = {
    obtainAllDrivers
}