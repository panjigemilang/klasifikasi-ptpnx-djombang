import React, { Component } from "react"
import KaryawanItems from "./KaryawanItems"
import isEmpty from "../../validations/is-empty"

class KaryawanRows extends Component {
  state = {
    karyawan: []
  }

  render() {
    this.state.karyawan = this.props.karyawan

    return !isEmpty(this.state.karyawan)
      ? this.state.karyawan.map((karyawanItem, i) => (
          <KaryawanItems key={i} karyawan={karyawanItem} index={i} />
        ))
      : []
  }
}

export default KaryawanRows
