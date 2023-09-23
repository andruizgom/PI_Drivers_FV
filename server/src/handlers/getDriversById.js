const { obtainDriversById } = require('../controllers/obtainDriversById')

const getDriversById = async (req, res) => {

  let { id } = req.params;
  
  obtainDriversById(id)
    .then((driver) => res.status(200).json(driver))
    .catch((error) => res.status(500).json(error.message));

}

module.exports = {
  getDriversById
}

