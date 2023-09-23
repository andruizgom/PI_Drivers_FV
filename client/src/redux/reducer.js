import { GET_ALL_DRIVERS, GET_DRIVERS_BY_NAME, GET_DRIVERS_BY_ID, CREATE_DRIVER, FILTER, ORDER, GET_TEAMS, DELETE_DRIVER, UPDATED_DRIVER } from "./action-types";

const initialState = {
    drivers: [],
    driversCopy: [],
    driversByID: {},
    teams: [],
}

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case GET_ALL_DRIVERS:

            return {
                ...state,
                drivers: state.drivers.length ? [...state.drivers] : action.payload,
                driversCopy: action.payload
            };

        case GET_DRIVERS_BY_NAME:
            return {
                ...state,
                drivers: action.payload,
            };

        case GET_DRIVERS_BY_ID:
            return {
                ...state,
                driversByID: action.payload
            };

        case GET_TEAMS:
            return {
                ...state,
                teams: action.payload,
            };

        case CREATE_DRIVER:
            return {
                ...state,
                drivers: [...state.drivers, action.payload],
                driversCopy: [...state.driversCopy, action.payload]
            };

        case DELETE_DRIVER:
            const deleteDriver = state.driversCopy.filter((driver) => driver.id !== action.payload);

            return {
                ...state,
                drivers: deleteDriver,
                driversCopy: deleteDriver
            };

        case UPDATED_DRIVER:
            const update = state.driversCopy.map(driver => driver.id === action.payload.id ? action.payload : driver);

            return {
                ...state,
                drivers: update,
                driversCopy: update
            };

        case FILTER:
            let driversFiltered = [...state.drivers]
            if (action.payload === 'Database ID') {
                driversFiltered = state.drivers.filter(driver => isNaN(driver.id));
            }
            else if (action.payload === 'API ID') {
                driversFiltered = state.drivers.filter(driver => !isNaN(driver.id));
            }
            else if (action.payload === 'Default') {
                driversFiltered = [...state.driversCopy]
            }
            else {
                driversFiltered = state.drivers.filter(driver => driver?.teams?.includes(action.payload));
            }

            return {
                ...state,
                drivers: driversFiltered
            };

        case ORDER:
            let driversOrder = [...state.drivers]

            if (action.payload === "Default") {
                driversOrder = [...state.driversCopy]
            }
            else if (action.payload === "A Alphabetical") {
                driversOrder.sort((a, b) => a.forename.localeCompare(b.forename));
            }
            else if (action.payload === "D Alphabetical") {
                driversOrder.sort((a, b) => b.forename.localeCompare(a.forename));
            }
            else if (action.payload === "A Birthdate") {
                driversOrder.sort((a, b) => a.dob.localeCompare(b.dob));
            }
            else if (action.payload === "D Birthdate") {
                driversOrder.sort((a, b) => b.dob.localeCompare(a.dob));
            }

            return {
                ...state,
                drivers: driversOrder
            };


        default: return { ...state }

    }

}

export default reducer; 