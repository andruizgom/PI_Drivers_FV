const { updateDriver } = require('../controllers/updateDriver')

const putDrivers = async (req, res) => {


    let { id } = req.params;

    const { forename, surname, dob, nationality, teams, description } = req.body;

    let image = null;

    if (req.files[0] !== undefined) {

        image = req.files[0].buffer;
    }

    updateDriver(id, forename, surname, image, dob, nationality, teams, description)
        .then((driver) => res.status(200).json(driver))
        .catch((error) => res.status(500).json(error.message));

};

module.exports = {
    putDrivers
}