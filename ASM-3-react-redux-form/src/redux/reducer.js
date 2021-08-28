import { DEPARTMENTS, ROLE, STAFFS } from '../shared/staffs';

export const initialState = {
    staffs: STAFFS,
    departments: DEPARTMENTS,
    role: ROLE,

};
export const Reducer = (state = initialState, action) => {
    return state;
}