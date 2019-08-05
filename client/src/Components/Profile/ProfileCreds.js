import React from "react"
import ExperienceItem from "./ExperienceItem"
import EducationItem from "./EducationItem"
import AllowanceItem from "./AllowanceItem"
import AchievementItem from "./AchievementItem"
import PelatihanItem from "./PelatihanItem"

export default function ProfileCreds(props) {
  const {
    education,
    experiences,
    allowance,
    pelatihan,
    achievement,
    pid
  } = props

  return (
    <div>
      <div className="row">
        {/* Experiences */}
        <div className="col-md-12 col-sm-12">
          {Object.keys(experiences).length > 0 ? (
            <div className="pr-creds">
              <h3 className="text-info font-weight-bold">Pengalaman</h3>
              <ul className="list-group">
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
              <h3 className="text-info font-weight-bold">Pendidikan</h3>
              <ul className="list-group">
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
              <h3 className="text-info font-weight-bold">Tunjangan</h3>
              <ul className="list-group">
                {allowance.map(allow => (
                  <AllowanceItem key={allow._id} allowance={allow} pid={pid} />
                ))}
              </ul>
            </div>
          ) : null}
        </div>

        {/* Pelatihan */}
        <div className="col-md-12 col-sm-12">
          {Object.keys(pelatihan).length > 0 ? (
            <div className="pr-creds">
              <h3 className="text-info font-weight-bold">Pelatihan</h3>
              <ul className="list-group">
                {pelatihan.map(pel => (
                  <PelatihanItem key={pel._id} pelatihan={pel} pid={pid} />
                ))}
              </ul>
            </div>
          ) : null}
        </div>

        {/* Penghargaan */}
        <div className="col-md-12 col-sm-12">
          {Object.keys(achievement).length > 0 ? (
            <div className="pr-creds">
              <h3 className="text-info font-weight-bold">Penghargaan</h3>
              <ul className="list-group">
                {achievement.map(peng => (
                  <AchievementItem
                    key={peng._id}
                    achievement={peng}
                    pid={pid}
                  />
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}
