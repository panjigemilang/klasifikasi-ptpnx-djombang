import { combineReducers } from "redux"
import authReducer from "./authReducer"
import errorReducer from "./errorReducer"
import karyawanReducer from "./karyawanReducer"

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  karyawan: karyawanReducer
})
