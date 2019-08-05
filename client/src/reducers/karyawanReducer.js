import {
  EMPLOYEE_LOADING,
  DELETE_EMPLOYEE,
  ADD_EMPLOYEE,
  GET_EMPLOYEES,
  GET_EMPLOYEE,
  ADD_EMPLOYEES
} from "../actions/types"

const initialState = {
  employees: [],
  employee: {},
  loading: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case EMPLOYEE_LOADING:
      return {
        ...state,
        loading: true
      }
    case ADD_EMPLOYEE:
      return {
        ...state,
        employees: [action.payload, ...state.employees]
      }
    case ADD_EMPLOYEES:
      return {
        ...state,
        employees: [action.payload, ...state.employees]
      }
    case GET_EMPLOYEE:
      return {
        ...state,
        employee: action.payload,
        loading: false
      }
    case GET_EMPLOYEES:
      return {
        ...state,
        employees: action.payload,
        loading: false
      }
    case DELETE_EMPLOYEE:
      return {
        ...state,
        loading: false
      }
    default:
      return state
  }
}
