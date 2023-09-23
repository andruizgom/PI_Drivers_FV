
import { GET_ALL_DRIVERS, GET_DRIVERS_BY_NAME, GET_DRIVERS_BY_ID, CREATE_DRIVER, FILTER, ORDER, GET_TEAMS, DELETE_DRIVER, UPDATED_DRIVER } from './action-types'
import axios from "axios";

export const getAllDrivers = () => {
    const endpoint = 'http://localhost:3001/drivers';
    return async (dispatch) => {
        try {
            const { data } = await axios.get(endpoint)

            if (!data) throw new Error('There was no data')

            return dispatch({
                type: GET_ALL_DRIVERS,
                payload: data,
            });

        } catch (error) {
            throw new Error(error.message)
        }
    };
};

export const getDriversByName = (forename) => {
    const endpoint = `http://localhost:3001/drivers/name?name=${forename}`;
    return async (dispatch) => {
        try {
            const { data } = await axios.get(endpoint)

            if (!data) throw new Error('There was no data');

            return dispatch({
                type: GET_DRIVERS_BY_NAME,
                payload: data,
            });

        } catch (error) {
            throw new Error(error.message);
        }

    };
};

export const getDriversById = (id) => {
    const endpoint = `http://localhost:3001/drivers/${id}`;
    return async (dispatch) => {
        try {
            const { data } = await axios.get(endpoint)

            if (!data) throw new Error('There was no data')

            return dispatch({
                type: GET_DRIVERS_BY_ID,
                payload: data,
            });

        } catch (error) {
            throw new Error(error.message);
        }

    };
};

export const postDriver = (driver) => {
    const endpoint = 'http://localhost:3001/drivers';
    return async (dispatch) => {
        try {

            const driverData = await axios.post(endpoint, driver);

            if (!driverData) throw new Error('There was no data');

            return dispatch({
                type: CREATE_DRIVER,
                payload: driverData,
            });

        } catch (error) {
            throw new Error(error.message)
        }
    };
};

export const getTeams = () => {
    const endpoint = 'http://localhost:3001/teams';
    return async (dispatch) => {
        try {
            const { data } = await axios.get(endpoint)

            if (!data) throw new Error('There was no data')

            return dispatch({
                type: GET_TEAMS,
                payload: data,
            });

        } catch (error) {
            throw new Error(error.message)
        }
    };
};

export const filterDrivers = (appliedFilter) => {

    return { type: FILTER, payload: appliedFilter }
}

export const orderDrivers = (order) => {

    return { type: ORDER, payload: order }
}

export const deleteDriver = (id) => {
    const endpoint = `http://localhost:3001/drivers/${id}`;
    return async (dispatch) => {
        try {
            await axios.delete(endpoint)

            return dispatch({
                type: DELETE_DRIVER,
                payload: id,
            });

        } catch (error) {
            console.log(error.message);
            throw new Error(error.message);
        }

    };
};

export const putDriver = (id, driver) => {
    const endpoint = `http://localhost:3001/drivers/${id}`;;
    return async (dispatch) => {
        try {

            const driverData = await axios.put(endpoint, driver);

            if (!driverData) throw new Error('There was no data');

            return dispatch({
                type: UPDATED_DRIVER,
                payload: driverData,
            });

        } catch (error) {
            throw new Error(error.message)
        }
    };
};