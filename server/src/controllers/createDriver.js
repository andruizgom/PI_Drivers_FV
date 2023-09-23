const URL = "http://localhost:5000/drivers";
const axios = require('axios');
const { Driver, Teams } = require('../db');
const { obtainTeams } = require('../controllers/obtainTeams')

const createDriver = async (forename, surname, image, dob, nationality, teams, description) => {

    try {

        if (!forename || !surname || !image || !dob || !nationality || !teams || !description) throw new Error('Incomplete data');

        const modifyString = (string) => {
            string = string.toLowerCase();
            string = string.charAt(0).toUpperCase() + string.slice(1);
            return string;
        }

        forename = modifyString(forename);
        surname = modifyString(surname);
        nationality = modifyString(nationality);

        const duplicateValidation = await Driver.findOne({ where: { forename: forename, surname: surname, nationality: nationality, dob: dob } });
        if (duplicateValidation) throw new Error('Driver alredy exist');


        //Fill the database with the teams in case it is empty.

        let DBTeams = await obtainTeams();

        const validationTeams = teams.split(',').map(team => team.trim());

        //Check if the teams entered by the user already exist. In that case, obtain their id.

        const teamsId = [];
        const teamsForAdd = [];

        for (const team of validationTeams) {

            const findTeam = DBTeams.find(teamDB => teamDB.name === team);

            if (findTeam) {
                teamsId.push(findTeam.id);
            } else {
                teamsForAdd.push(team);
            }
        }

        //Create the teams entered by the user that were not found in the database and add their id to teamsId array.

        for (const team of teamsForAdd) {
            const newTeam = await Teams.create({ name: team });
            teamsId.push(newTeam.id)
        }

        const newDriver = await Driver.create({ forename, surname, image, dob, nationality, description });
        const newDriverId = newDriver.id;

        await newDriver.addTeams(teamsId);

        const relationDriverTeam = await Driver.findByPk(newDriverId, {
            include: [{
                model: Teams,
                attributes: ['name'], //Get only the 'name' attribute from Teams.
            }],
        });

        const teamsNames = await relationDriverTeam.Teams.map(team => team.name).join(", ");

        const createdDriver = {
            id: relationDriverTeam.id,
            forename: relationDriverTeam.forename,
            surname: relationDriverTeam.surname,
            image: relationDriverTeam.image,
            nationality: relationDriverTeam.nationality,
            dob: relationDriverTeam.dob,
            teams: teamsNames,
            description: relationDriverTeam.description

        };

        return createdDriver;

    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = {
    createDriver
}