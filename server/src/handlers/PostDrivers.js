const { createDriver } = require('../controllers/createDriver')

const postDrivers = async (req, res) => {


  const { forename, surname, dob, nationality, teams, description } = req.body;

  let image = null;

  if (req.files[0] !== undefined) {

    image = req.files[0].buffer;
  }


  createDriver(forename, surname, image, dob, nationality, teams, description)
    .then((driver) => res.status(200).json(driver))
    .catch((error) => res.status(500).json(error.message));

};

module.exports = {
  postDrivers
}