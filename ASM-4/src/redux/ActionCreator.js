import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

export const addStaff = (staff) => ({
    type: ActionTypes.ADD_STAFF,
    payload: staff
});
//staffs
export const fetchStaffs = () => (dispatch) => {

    dispatch(staffsLoading(true));

    return fetch(baseUrl + 'staffs')
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    var error = new Error('Error ' + response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(staffs => dispatch(addStaffs(staffs)))
        .catch(error => dispatch(staffsFailed(error.message)));
}

export const staffsLoading = () => ({
    type: ActionTypes.STAFFS_LOADING
});

export const staffsFailed = (errmess) => ({
    type: ActionTypes.STAFFS_FAILED,
    payload: errmess
});

export const addStaffs = (staffs) => ({
    type: ActionTypes.ADD_STAFFS,
    payload: staffs
});


//add new staff
export const postStaff = (staff) => (dispatch) => {
    const newStaff = {
        name: staff.name,
        doB: staff.doB,
        salaryScale: staff.salaryScale,
        startDate: staff.startDate,
        departmentId: staff.departmentId,
        annualLeave: staff.annualLeave,
        overTime: staff.overTime,
        image: staff.image,
    };
    newStaff.date = new Date().toISOString();

    return fetch(baseUrl + 'staffs', {
            method: "POST",
            body: JSON.stringify(newStaff),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    var error = new Error('Error ' + response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                throw error;
            })
        .then(response => response.json())
        .then(response => {
            dispatch(addStaffs(response))
        })
        .catch(error => {
            console.log('post staffs', error.message);
            alert('Your staff information could not be posted\nError: ' + error.message);
        });
};
//delete staff
export const deleteStaff = (id) => (dispatch) => {
    return fetch(baseUrl + 'staffs/' + id, {
            method: "DELETE",
        })
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    var error = new Error('Error ' + response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                throw error;
            })
        .then(response => response.json())
        .then(response => {
            dispatch(addStaffs(response))
        })
        .catch(error => {
            console.log('delete staffs', error.message);
            alert('Your staff information could not be deleted\nError: ' + error.message);
        });
}

//edit staff
export const editStaff = (staff) => (dispatch) => {
    //gọi lên sv
    return fetch(baseUrl + 'staffs', {
            method: "PATCH",
            body: JSON.stringify(staff),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    var error = new Error('Error ' + response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                throw error;
            })
        .then(response => response.json())
        .then(response => {
            dispatch(addStaffs(response))
        })
        .catch(error => {
            console.log('update staffs', error.message);
            alert('Your staff information could not be update\nError: ' + error.message);
        });
}


//departments
export const fetchDepartments = () => (dispatch) => {

    dispatch(departmentsLoading(true));

    return fetch(baseUrl + 'departments')
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    var error = new Error('Error ' + response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(departments => dispatch(addDepartments(departments)))
        .catch(error => dispatch(departmentsFailed(error.message)));
}

export const departmentsLoading = () => ({
    type: ActionTypes.DEPARTMENT_LOADING
});

export const departmentsFailed = (errmess) => ({
    type: ActionTypes.DEPARTMENT_FAILED,
    payload: errmess
});

export const addDepartments = (departments) => ({
    type: ActionTypes.ADD_DEPARTMENT,
    payload: departments
});

//lấy Data staff of depart  từ api
export const fetchDepartOfStaff = (departmentId) => (dispatch) => {

    dispatch(staffDepartsLoading(true));

    return fetch(baseUrl + `departments/${departmentId}`)
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    var error = new Error('Error ' + response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(staffs => dispatch(addStaffOfDeparts(staffs)))
        .catch(error => dispatch(staffDepartsFailed(error.message)));
}
export const addStaffOfDeparts = (staffs) => ({
    type: ActionTypes.ADD_STAFF_DEPART,
    payload: staffs
});

export const staffDepartsLoading = () => ({
    type: ActionTypes.STAFFS_DEPART_LOADING
});

export const staffDepartsFailed = (errmess) => ({
    type: ActionTypes.STAFFS_DEPART_FAILED,
    payload: errmess
});



//payroll
export const fetchPayroll = () => (dispatch) => {

    dispatch(payrollLoading(true));

    return fetch(baseUrl + 'staffsSalary')
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    var error = new Error('Error ' + response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(payroll => dispatch(addPayroll(payroll)))
        .catch(error => dispatch(payrollFailed(error.message)));
}

export const payrollLoading = () => ({
    type: ActionTypes.PAYROLL_LOADING
});

export const payrollFailed = (errmess) => ({
    type: ActionTypes.PAYROLL_FAILED,
    payload: errmess
});

export const addPayroll = (payroll) => ({
    type: ActionTypes.ADD_PAYROLL,
    payload: payroll
});