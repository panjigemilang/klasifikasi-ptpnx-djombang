import React from "react"
import ExperienceItem from "./ExperienceItem"
import EducationItem from "./EducationItem"
import AllowanceItem from "./AllowanceItem"

export default function ProfileCreds(props) {
  const { education, experiences, allowance, pid } = props
  console.log("ini props : ")
  console.log(props)

  return (
    <div>
      <div className="row">
        {/* Experiences */}
        <div className="col-md-12 col-sm-12">
          {Object.keys(experiences).length > 0 ? (
            <div className="pr-creds">
              <h3 className="text-info font-weight-bold">Experiences</h3>
              <ul className="list-group">
                {/* Experiences */}
                {experiences.map(exp => (
                  <ExperienceItem key={exp._id} experience={exp} pid={pid} />
                ))}
              </ul>
            </div>
          ) : null}
        </div>

        {/* Educations */}
        <div className="col-md-12 col-sm-12">
          {Object.keys(education).length > 0 ? (
            <div className="pr-creds">
              <h3 className="text-info font-weight-bold">Educations</h3>
              <ul className="list-group">
                {/* Educations */}
                {education.map(edu => (
                  <EducationItem key={edu._id} education={edu} pid={pid} />
                ))}
              </ul>
            </div>
          ) : null}
        </div>

        {/* Allowances */}
        <div className="col-md-12 col-sm-12">
          {Object.keys(allowance).length > 0 ? (
            <div className="pr-creds">
              <h3 className="text-info font-weight-bold">Allowances</h3>
              <ul className="list-group">
                {/* allowances */}
                {allowance.map(allow => (
                  <AllowanceItem key={allow._id} allowance={allow} pid={pid} />
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}
