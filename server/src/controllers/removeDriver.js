const { Driver } = require('../db');

const removeDriver = async (id) => {
    try {
        await Driver.destroy({ where: { id } });

        return true;

    } catch (error) {
        throw new Error("Driver could not be removed")
    }
};

module.exports = {
    removeDriver
}