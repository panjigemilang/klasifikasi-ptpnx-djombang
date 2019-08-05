import axios from "axios"
import {
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS,
  SET_CURRENT_USER,
  GET_PROFILES
} from "./types"

// Get current profile
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading())
  axios
    .get("/api/profile")
    .then(res => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    })
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    )
}

// Get all profiles
export const getProfiles = () => dispatch => {
  dispatch(setProfileLoading())
  axios
    .get("/api/profile/all")
    .then(res => {
      dispatch({
        type: GET_PROFILES,
        payload: res.data
      })
    })
    .catch(err =>
      dispatch({
        type: GET_PROFILES,
        payload: null
      })
    )
}

// Get profile by handle
export const getProfileById = id => dispatch => {
  dispatch(setProfileLoading())
  axios
    .get(`/api/profile/id/${id}`)
    .then(res => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    })
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: null
      })
    )
}

// Delete account & profile
export const deleteAccount = () => dispatch => {
  if (
    window.confirm(
      "Are you sure to delete your account? This cannot be undone."
    )
  ) {
    axios
      .delete("/api/profile/")
      .then(res =>
        dispatch({
          type: SET_CURRENT_USER,
          payload: {}
        })
      )
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      )
  }
}

// Add experiences
export const addExperience = (expData, history, id) => dispatch =>
  axios
    .post("/api/profile/experience/", expData)
    .then(res => history.push(`/profile/id/${id}`))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )

// Delete experiences
export const deleteExperience = (id, pid) => dispatch =>
  axios
    .delete(`/api/profile/experience/${id}&${pid}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )

// Add educations
export const addEducation = (eduData, history, id) => dispatch =>
  axios
    .post("/api/profile/education/", eduData)
    .then(res => history.push(`/profile/id/${id}`))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )

// Delete educations
export const deleteEducation = (id, pid) => dispatch =>
  axios
    .delete(`/api/profile/education/${id}&${pid}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )

// Add allowances
export const addAllowance = (allowanceData, history, id) => dispatch =>
  axios
    .post("/api/profile/allowance/", allowanceData)
    .then(res => history.push(`/profile/id/${id}`))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )

// Delete allowances
export const deleteAllowance = (id, pid) => dispatch =>
  axios
    .delete(`/api/profile/allowance/${id}&${pid}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )

// Add pelatihan
export const addPelatihan = (eduData, history, id) => dispatch =>
  axios
    .post("/api/profile/pelatihan/", eduData)
    .then(res => history.push(`/profile/id/${id}`))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )

// Delete pelatihan
export const deletePelatihan = (id, pid) => dispatch =>
  axios
    .delete(`/api/profile/pelatihan/${id}&${pid}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )

// Add achievements
export const addAchievement = (eduData, history, id) => dispatch =>
  axios
    .post("/api/profile/achievement/", eduData)
    .then(res => history.push(`/profile/id/${id}`))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )

// Delete achievements
export const deleteAchievement = (id, pid) => dispatch =>
  axios
    .delete(`/api/profile/achievement/${id}&${pid}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )

// Profile loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  }
}

// clear current profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  }
}
