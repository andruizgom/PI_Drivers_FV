const URL = "http://localhost:5000/drivers";
const axios = require('axios');
const { Driver, Teams } = require('../db');

const obtainDriversById = async (id) => {
  try {
    if (!isNaN(id)) {
      id = Number(id);
    }

    if (typeof id === 'number' && id <= 508) {
      const { data } = await axios.get(`${URL}/${id}`)
      const { name, image, dob, nationality, teams, description } = data;
      const placeholderImage = "https://img.remediosdigitales.com/acd470/kubica-barcelona-f1-2020/1366_2000.jpg";
      const apiDriver = {
        id,
        forename: name.forename,
        surname: name.surname,
        image: image.url === "" ? placeholderImage : image.url,
        dob,
        nationality,
        teams: teams,
        description
      }
      return apiDriver;
    }

    const driver = await Driver.findByPk(id, {
      include: [{
        model: Teams,
        attributes: ['name'], //Get only the 'name' attribute from Teams.
      }],
    });


    if (driver) {

      const teamName = await driver.Teams.map(team => team.name).join(", ");;

      const driverWithTeams = {
        id: driver.id,
        forename: driver.forename,
        surname: driver.surname,
        image: driver.image,
        nationality: driver.nationality,
        dob: driver.dob,
        teams: teamName,
        description: driver.description
      };

      return driverWithTeams;
    }

  } catch (error) {
    throw new Error("Driver not found")
  }
};

module.exports = {
  obtainDriversById
}