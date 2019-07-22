import { combineReducers } from "redux"
import authReducer from "./authReducer"
import errorReducer from "./errorReducer"
import karyawanReducer from "./karyawanReducer"
import profileReducer from "./profileReducer"

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  karyawan: karyawanReducer,
  profile: profileReducer
})
