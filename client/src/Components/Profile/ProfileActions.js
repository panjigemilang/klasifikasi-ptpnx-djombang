import React from "react"
import { Link } from "react-router-dom"

export default function ProfileActions(props) {
  const { userId } = props

  return (
    <div className="btn-creds" role="group">
      <Link
        to={`/profile/add-experience/${userId}`}
        className="mb-2 btn btn-sm btn-light"
      >
        <i className="fab fa-black-tie text-info mr-1" />
        Add Experience
      </Link>
      <Link
        to={`/profile/add-education/${userId}`}
        className="mb-2 btn btn-sm btn-light"
      >
        <i className="fas fa-graduation-cap text-info mr-1" />
        Add Education
      </Link>
      <Link
        to={`/profile/add-allowance/${userId}`}
        className="mb-2 btn btn-sm btn-light"
      >
        <i className="fas fa-users text-info mr-1" />
        Add Allowance
      </Link>
    </div>
  )
}
