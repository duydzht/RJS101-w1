import { createStore, combineReducers, applyMiddleware } from 'redux';
//import { Reducer, initialState } from './reducer';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { Staffs, StaffOfDeparts } from './staffs';
import { Departments } from './department';
import { Payroll } from './payroll';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            staffs: Staffs,
            departments: Departments,
            payroll: Payroll,
            staffOfDeparts: StaffOfDeparts,
        }),
        applyMiddleware(thunk, logger)
    );
    return store;
}