import React from "react"
import { connect } from "react-redux"
import { PropTypes } from "prop-types"
import Moment from "react-moment"
import { deletePelatihan } from "../../actions/profileActions"

function PelatihanItem(props) {
  const { pelatihan, pid } = props

  const onClickDelete = (edu_id, uid) => {
    props.deletePelatihan(edu_id, uid)
  }

  return (
    <React.Fragment>
      <li className="list-group-item">
        <h4 className="font-weight-bold" style={{ display: "inline-block" }}>
          {pelatihan.namaPelatihan}
        </h4>
        <button
          type="button"
          className="btn btn-sm btn-danger float-right"
          onClick={() => onClickDelete(pelatihan._id, pid)}
        >
          &times;
        </button>
        <hr />
        <p>
          <Moment format="DD/MM/YYYY">{pelatihan.tahunPelatihan}</Moment>
        </p>
        <p>
          <strong>Nomor sertifikat : </strong>
          {pelatihan.noSertifikat}
        </p>
        <p>
          <strong>Penyelenggara &nbsp;&nbsp;: </strong>
          {pelatihan.penyelenggara}
        </p>
      </li>
    </React.Fragment>
  )
}

PelatihanItem.propTypes = {
  deleteExperience: PropTypes.func.isRequired
}

export default connect(
  null,
  { deletePelatihan }
)(PelatihanItem)
