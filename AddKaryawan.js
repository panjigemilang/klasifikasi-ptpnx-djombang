// import React, { Component } from "react"
// import "../../css/TambahKaryawan.css"
// import AddKaryawanRow from "./AddKaryawanRow"
// // import AddKaryawanRow from "./AddKaryawanRow"

// class AddKaryawan extends Component {
//   onSubmit(e) {
//     e.preventDefault()

//     console.log("ini isinya apaan")
//     console.log(<AddKaryawanRow />)
//   }

//   render() {
//     return (
//       <div className="wrapper-add">
//         <div className="row">
//           <div className="container">
//             <br />
//             <div className="row">
//               <div className="col-md-6">
//                 <a
//                   href="/karyawan-list"
//                   className="btn btn-light mb-3 float-left"
//                 >
//                   Kembali
//                 </a>
//               </div>
//               <div className="col-md-6" />
//             </div>
//             <br />
//             <h1 className="display-4 text-center">Tambah Data Karyawan</h1>
//             <br />

//             <table className="table table-striped">
//               <thead className="thead-dark">
//                 <tr>
//                   <th scope="col">No</th>
//                   <th scope="col">NIP</th>
//                   <th scope="col">Nama</th>
//                   <th scope="col">Departemen</th>
//                   <th scope="col">Jenis Kelamin</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <AddKaryawanRow />
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         </div>

//         <div className="row">
//           <div className="btn-box">
//             <div className="container">
//               <button type="button" className="btn btn-danger">
//                 Batal
//               </button>
//               <button type="button" className="btn btn-light">
//                 Tambah
//               </button>
//               <button
//                 type="submit"
//                 className="btn btn-primary"
//                 onClick={e => this.onSubmit(e)}
//               >
//                 Simpan
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     )
//   }
// }

// export default AddKaryawan
