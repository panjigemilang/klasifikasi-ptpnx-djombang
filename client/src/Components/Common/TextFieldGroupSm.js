import React from "react"
import classnames from "classnames"
import PropTypes from "prop-types"

const TextFieldGroupSm = ({
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
      {info && <small className="form-text text-muted">{info}</small>}
      <input
        type={type}
        className={classnames("form-control form-control-sm", {
          "is-invalid": errors
        })}
        placeholder={placeHolder}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
      {errors && <div className="invalid-feedback">{errors}</div>}
    </div>
  )
}

TextFieldGroupSm.propTypes = {
  name: PropTypes.string.isRequired,
  info: PropTypes.string,
  errors: PropTypes.string,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  placeHolder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool
}

TextFieldGroupSm.defaultProps = {
  type: "text"
}

export default TextFieldGroupSm
