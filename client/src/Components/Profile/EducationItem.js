import React from "react"
import { connect } from "react-redux"
import { PropTypes } from "prop-types"
import Moment from "react-moment"
import { deleteEducation } from "../../actions/profileActions"

function EducationItem(props) {
  // const [id, setId] = useState(null)
  let id
  const { education, pid } = props
  console.log("ini props terbaru")
  console.log(education._id)

  const onClickDelete = (edu_id, uid) => {
    console.log("ini edu ID nya")
    console.log(edu_id)
    props.deleteEducation(edu_id, uid)
  }

  const cobaDoang = (e, paid) => {
    e.preventDefault()
    console.log("paid nya")
    console.log(paid)

    console.log(id)
  }

  const ngesetId = setid => (id = setid)

  // useEffect(() => {
  //   console.log("ID terbaru")
  //   console.log(id)
  // }, [id])

  return (
    <React.Fragment>
      <li className="list-group-item">
        <h4 className="font-weight-bold" style={{ display: "inline-block" }}>
          {education.institution} &nbsp;
          {education.location ? (
            <React.Fragment>at {education.location}</React.Fragment>
          ) : null}
        </h4>
        <button
          type="button"
          className="btn btn-sm btn-danger float-right"
          data-toggle="modal"
          data-target="#educationModalCenter"
          data-id={education._id}
          onClick={() => ngesetId(education._id)}
        >
          &times;
        </button>
        <hr />
        <p>
          <Moment format="DD/MM/YYYY">{education.from}</Moment>&nbsp;-&nbsp;
          {education.to == null ? (
            "Now"
          ) : (
            <Moment format="DD/MM/YYYY">{education.to}</Moment>
          )}
        </p>
        <p>
          <strong>Field of Study : </strong> {education.fieldofstudy}
        </p>
        {education.degree ? (
          <p>
            <strong>
              Degree&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:{" "}
            </strong>
            {education.degree}
          </p>
        ) : null}
      </li>

      {/* MODALS */}
      <div
        className="modal fade"
        id="educationModalCenter"
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
                Delete Education
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
              Are you sure to delete this education? This cannot be undone.
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => onClickDelete(education._id, pid)}
                // onClick={e => cobaDoang(e, education._id)}
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

EducationItem.propTypes = {
  deleteExperience: PropTypes.func.isRequired
}

export default connect(
  null,
  { deleteEducation }
)(EducationItem)
