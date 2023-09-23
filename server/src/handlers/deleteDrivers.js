const { removeDriver } = require('../controllers/removeDriver')

const deleteDrivers = async (req, res) => {

    let { id } = req.params;

    removeDriver(id)
        .then((confirm) => res.status(200).json("The driver was successfully removed"))
        .catch((error) => res.status(500).json(error.message));

}

module.exports = {
    deleteDrivers
}