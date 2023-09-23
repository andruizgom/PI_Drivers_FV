const { obtainAllDrivers } = require('../controllers/obtainAllDrivers')

const getAllDrivers = async (req, res) => {

    obtainAllDrivers()
        .then((drivers) => res.status(200).json(drivers))
        .catch((error) => res.status(500).json(error.message));

}

module.exports = {
    getAllDrivers
}