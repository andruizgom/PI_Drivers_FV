const { Router } = require("express");
const {getAllDrivers} = require("../handlers/getAllDrivers");
const {getDriversById} = require("../handlers/getDriversById");
const {getDriversByName} = require("../handlers/getDriversByName");
const {postDrivers} = require("../handlers/PostDrivers");
const {getTeams} = require("../handlers/getTeams");
const {deleteDrivers} = require("../handlers/deleteDrivers");
const {putDrivers} = require("../handlers/putDrivers");

const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


const router = Router();

router.get('/drivers', (req, res) => {
    getAllDrivers(req, res);
})

router.put('/drivers/:id', upload.any(), (req, res) => {
    putDrivers(req, res);
    
})

router.delete('/drivers/:id', (req, res) => {
    deleteDrivers(req, res);
    
})

//http://localhost:3001/drivers/name?name=alex
router.get('/drivers/name/', (req, res) => {
    getDriversByName(req, res);
})
http://localhost:3001/drivers/5
router.get('/drivers/:id', (req, res) => {
    getDriversById(req, res);
})

router.post('/drivers', upload.any(), (req, res) => {
    postDrivers(req, res);
})

router.get('/teams', (req, res) => {
    getTeams(req, res);
})



module.exports = router;

