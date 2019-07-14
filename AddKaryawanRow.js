// import React, { Component } from "react"
// import TextFieldGroupSm from "../Common/TextFieldGroupSm"

// export default class AddKaryawanRow extends Component {
//   constructor() {
//     super()
//     this.state = {
//       nip: "",
//       name: "",
//       departemen: "",
//       jenisKelamin: "",
//       nilai: "",
//       errors: {}
//     }
//   }

//   onChange(e) {
//     this.setState({
//       [e.target.name]: e.target.value
//     })
//   }

//   render() {
//     const { errors } = this.state

//     return (
//       <React.Fragment>
//         <th scope="row">1</th>
//         <td>
//           <TextFieldGroupSm
//             name="nip"
//             type="text"
//             placeHolder="* NIP"
//             value={this.state.nip}
//             onChange={e => this.onChange(e)}
//             errors={errors.nip}
//           />
//         </td>
//         <td>
//           <TextFieldGroupSm
//             name="name"
//             type="text"
//             placeHolder="* Name"
//             value={this.state.name}
//             onChange={e => this.onChange(e)}
//             errors={errors.name}
//           />
//         </td>
//         <td>
//           <TextFieldGroupSm
//             name="departemen"
//             type="text"
//             placeHolder="* Departemen"
//             value={this.state.departemen}
//             onChange={e => this.onChange(e)}
//             errors={errors.departemen}
//           />
//         </td>
//         <td>
//           <TextFieldGroupSm
//             name="jenisKelamin"
//             type="text"
//             placeHolder="pria/wanita"
//             value={this.state.jenisKelamin}
//             onChange={e => this.onChange(e)}
//             errors={errors.jenisKelamin}
//           />
//         </td>
//       </React.Fragment>
//     )
//   }
// }
