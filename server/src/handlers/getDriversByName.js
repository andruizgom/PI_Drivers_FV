const { obtainDriversByName } = require('../controllers/obtainDriversByName')

const getDriversByName = async (req, res) => {

    const { name } = req.query;

    obtainDriversByName(name)
        .then((drivers) => res.status(200).json(drivers))
        .catch((error) => res.status(500).json(error.message));
}

module.exports = {
    getDriversByName
}