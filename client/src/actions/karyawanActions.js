import axios from "axios"
import {
  ADD_EMPLOYEE,
  GET_ERRORS,
  GET_EMPLOYEES,
  CLEAR_ERRORS,
  GET_EMPLOYEE,
  EMPLOYEE_LOADING
} from "./types"

// adding employee
export const addEmployee = (postData, history) => dispatch => {
  dispatch(clearErrors())
  axios
    .post("/api/employees/add-karyawan", postData)
    .then(res => {
      dispatch({
        type: ADD_EMPLOYEE,
        payload: res.data
      })
      history.push("/karyawan-list")
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}

// update karyawan && upload image
export const updateKaryawan = (id, postData, history) => dispatch => {
  dispatch(clearErrors())
  axios
    .post(`/api/employees/id/${id}`, postData)
    .then(res => {
      history.push("/karyawan-list")
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}

// update karyawan && upload image
export const uploadImage = (nip, formData, config) => dispatch => {
  dispatch(clearErrors())
  axios
    .post(`/api/employees/upload/${nip}`, formData, config)
    .then(res => {
      alert("Upload Berhasil!")
      dispatch({
        type: GET_EMPLOYEE,
        payload: res.data
      })
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}

// get all employees
export const getEmployees = () => dispatch => {
  dispatch(setPostLoading())
  axios
    .get("/api/employees/all")
    .then(res =>
      dispatch({
        type: GET_EMPLOYEES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_EMPLOYEES,
        payload: null
      })
    )
}

// get employee by NIP
export const getEmployee = nip => dispatch => {
  dispatch(setPostLoading())
  axios
    .get(`/api/employees/nip/${nip}`)
    .then(res =>
      dispatch({
        type: GET_EMPLOYEE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: null
      })
    )
}

// get employee by ID
export const getEmployeeById = id => dispatch => {
  dispatch(setPostLoading())
  axios
    .get(`/api/employees/id/${id}`)
    .then(res =>
      dispatch({
        type: GET_EMPLOYEE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: null
      })
    )
}

// delete employee
export const deleteEmployee = (id, history) => dispatch => {
  if (
    window.confirm(
      "Are you sure to delete the employee? This cannot be undone."
    )
  ) {
    axios
      .delete(`/api/employees/${id}`)
      .then(res => dispatch(getEmployees()))
      .catch(err => {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      })
  }
}

export const setPostLoading = () => {
  return {
    type: EMPLOYEE_LOADING
  }
}

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  }
}
