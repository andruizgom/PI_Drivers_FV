const { obtainTeams } = require('../controllers/obtainTeams')

const getTeams = async (req, res) => {

    obtainTeams()
        .then((teams) => res.status(200).json(teams))
        .catch((error) => res.status(500).json(error.message));
};

module.exports = {
    getTeams
}
