import React from "react"
import { connect } from "react-redux"
import { PropTypes } from "prop-types"
import { deleteAllowance } from "../../actions/profileActions"

function AllowanceItem(props) {
  const { allowance, pid } = props

  const onClickDelete = (exp_id, uid) => {
    props.deleteAllowance(exp_id, uid)
  }

  return (
    <React.Fragment>
      <li className="list-group-item">
        <h4 className="font-weight-bold" style={{ display: "inline-block" }}>
          {allowance.name}
        </h4>
        <button
          type="button"
          className="btn btn-sm btn-danger float-right"
          data-toggle="modal"
          data-target="#exampleModalCenter"
        >
          &times;
        </button>
        <p>
          <strong>
            Status
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            :
          </strong>{" "}
          {allowance.status}
        </p>
        {allowance.noTelepon ? (
          <p>
            <strong>Telephone Number : </strong> {allowance.noTelepon}
          </p>
        ) : null}
      </li>

      {/* MODALS */}
      <div
        className="modal fade"
        id="exampleModalCenter"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5
                className="modal-title font-weight-bold"
                id="exampleModalLongTitle"
              >
                Delete Allowance
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              Are you sure to delete this allowance? This cannot be undone.
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => onClickDelete(allowance._id, pid)}
                data-dismiss="modal"
              >
                Sure
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

AllowanceItem.propTypes = {
  deleteExperience: PropTypes.func.isRequired
}

export default connect(
  null,
  { deleteAllowance }
)(AllowanceItem)
