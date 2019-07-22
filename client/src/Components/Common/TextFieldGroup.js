import React from "react"
import classnames from "classnames"
import PropTypes from "prop-types"

const TextFieldGroup = ({
  name,
  info,
  errors,
  type,
  value,
  placeHolder,
  onChange,
  disabled
}) => {
  return (
    <div className="form-group">
      {info && <small className="form-text">{info}</small>}
      <input
        type={type}
        className={classnames("form-control form-control-lg", {
          "is-invalid": errors
        })}
        placeholder={placeHolder}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
      {errors && (
        <div
          className="invalid-feedback"
          style={{ textShadow: "1px 1px white", fontWeight: "bolder" }}
        >
          {errors}
        </div>
      )}
    </div>
  )
}

TextFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  info: PropTypes.string,
  errors: PropTypes.string,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  placeHolder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.string
}

TextFieldGroup.defaultProps = {
  type: "text"
}

export default TextFieldGroup
