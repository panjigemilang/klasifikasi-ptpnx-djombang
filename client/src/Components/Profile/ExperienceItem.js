import React from "react"
import { connect } from "react-redux"
import { PropTypes } from "prop-types"
import Moment from "react-moment"
import { deleteExperience } from "../../actions/profileActions"

function ExperienceItem(props) {
  const { experience, pid } = props

  const onClickDelete = (exp_id, uid) => {
    props.deleteExperience(exp_id, uid)
  }

  return (
    <React.Fragment>
      <li className="list-group-item">
        <h4 className="font-weight-bold" style={{ display: "inline-block" }}>
          {experience.company}
        </h4>
        <button
          type="button"
          className="btn btn-sm btn-danger float-right"
          data-toggle="modal"
          data-target="#exampleModalCenter"
        >
          &times;
        </button>
        <hr />
        <p>
          <Moment format="DD/MM/YYYY">{experience.from}</Moment>&nbsp;-&nbsp;
          {experience.to == null ? (
            "Now"
          ) : (
            <Moment format="DD/MM/YYYY">{experience.to}</Moment>
          )}
        </p>
        <p>
          <strong>Position &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: </strong>
          {experience.title}&nbsp;
          {experience.location ? (
            <React.Fragment>At {experience.location}</React.Fragment>
          ) : null}
        </p>
        <p>
          <strong>Description : </strong> {experience.description}
        </p>
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
                Delete Experience
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
              Are you sure to delete this experience? This cannot be undone.
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => onClickDelete(experience._id, pid)}
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

ExperienceItem.propTypes = {
  deleteExperience: PropTypes.func.isRequired
}

export default connect(
  null,
  { deleteExperience }
)(ExperienceItem)
