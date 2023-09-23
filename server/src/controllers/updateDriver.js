const { Driver, Teams } = require('../db');
const { obtainTeams } = require('../controllers/obtainTeams')

const updateDriver = async (id, forename, surname, image, dob, nationality, teams, description) => {
    try {

        if (!id || !forename || !surname || !image || !dob || !nationality || !teams || !description) throw new Error('Incomplete data');


        const currentRelationDriverTeam = await Driver.findByPk(id, {
            include: [{
                model: Teams,
                attributes: ['id'], //Get only the 'id' attribute from Teams.
            }],
        });

        const currentTeamsID = await currentRelationDriverTeam.Teams.map(team => team.id);

        const driver = await Driver.findByPk(id);

        await driver.removeTeams(currentTeamsID);

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

        await Driver.update({ forename, surname, image, dob, nationality, description }, { where: { id } });

        const updateDriver = await Driver.findByPk(id);


        await updateDriver.addTeams(teamsId);

        const updateRelationDriverTeam = await Driver.findByPk(id, {
            include: [{
                model: Teams,
                attributes: ['name'], //Get only the 'name' attribute from Teams.
            }],
        });

        const teamsNames = await updateRelationDriverTeam.Teams.map(team => team.name).join(", ");

        const updateDriverWithTeams = {
            id: updateRelationDriverTeam.id,
            forename: updateRelationDriverTeam.forename,
            surname: updateRelationDriverTeam.surname,
            image: updateRelationDriverTeam.image,
            nationality: updateRelationDriverTeam.nationality,
            dob: updateRelationDriverTeam.dob,
            teams: teamsNames,
            description: updateRelationDriverTeam.description

        };

        return updateDriverWithTeams;


    } catch (error) {
        // throw new Error("Driver could not be updated")
        throw new Error(error.message);

    }
};

module.exports = {
    updateDriver
}

