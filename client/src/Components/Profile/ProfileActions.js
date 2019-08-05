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
        &nbsp;Tambah Pengalaman
      </Link>
      <Link
        to={`/profile/add-education/${userId}`}
        className="mb-2 btn btn-sm btn-light"
      >
        <i className="fas fa-graduation-cap text-info mr-1" />
        &nbsp;Tambah Pendidikan
      </Link>
      <Link
        to={`/profile/add-allowance/${userId}`}
        className="mb-2 btn btn-sm btn-light"
      >
        <i className="fas fa-users text-info mr-1" />
        &nbsp;Tambah Tunjangan
      </Link>
      <Link
        to={`/profile/add-pelatihan/${userId}`}
        className="mb-2 btn btn-sm btn-light"
      >
        <i className="fab fa-accessible-icon text-info mr-1" />
        &nbsp;Tambah Pelatihan
      </Link>
      <Link
        to={`/profile/add-achievement/${userId}`}
        className="mb-2 btn btn-sm btn-light"
      >
        <i className="fas fa-trophy text-info mr-1" />
        &nbsp;Tambah Penghargaan
      </Link>
      <Link
        to={`/profile/export/${userId}`}
        className="mb-2 btn btn-sm btn-info"
      >
        <i className="fas fa-print mr-1" />
        &nbsp;Export
      </Link>
    </div>
  )
}
