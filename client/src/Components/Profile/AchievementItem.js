import React from "react"
import { connect } from "react-redux"
import { PropTypes } from "prop-types"
import Moment from "react-moment"
import { deleteAchievement } from "../../actions/profileActions"

function AchievementItem(props) {
  const { achievement, pid } = props

  const onClickDelete = (edu_id, uid) => {
    props.deleteAchievement(edu_id, uid)
  }

  return (
    <React.Fragment>
      <li className="list-group-item">
        <h4 className="font-weight-bold" style={{ display: "inline-block" }}>
          {achievement.jenisPenghargaan}
        </h4>
        <button
          type="button"
          className="btn btn-sm btn-danger float-right"
          onClick={() => onClickDelete(achievement._id, pid)}
        >
          &times;
        </button>
        <hr />
        <p>
          <Moment format="DD/MM/YYYY">{achievement.tahunPenghargaan}</Moment>
        </p>
        {achievement.oleh ? (
          <p>
            <strong>Diberikan oleh : </strong>
            {achievement.oleh}
          </p>
        ) : null}
      </li>
    </React.Fragment>
  )
}

AchievementItem.propTypes = {
  deleteExperience: PropTypes.func.isRequired
}

export default connect(
  null,
  { deleteAchievement }
)(AchievementItem)
