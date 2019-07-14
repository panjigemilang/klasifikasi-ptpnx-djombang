import React, { Component } from "react"

class Images extends Component {
  onChangeHandler(e) {
    e.preventDefault()
    console.log("ini apaand ah")
    console.log(e.target.files[0])
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="offset-md-3 col-md-6">
            <div className="form-group files">
              <label>Upload your files</label>
              <input
                type="file"
                name="file"
                className="form-control"
                onChange={e => this.onChangeHandler(e)}
              />
            </div>
            <button type="button" className="btn btn-lg btn-primary" />
          </div>
        </div>
      </div>
    )
  }
}

export default Images
