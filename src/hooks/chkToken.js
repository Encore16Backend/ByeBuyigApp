// import React from "react";
// import axios from "axios";
// import postRefresh from "./postRefresh";

// const chkToken = async (e)=>{
//     // e.preventDefault();
//     await axios.get('http://127.0.0.1:8081/api/users', {
//         headers: {
//             "Content-Type": "application/json",
//             "Authorization": "Bearer " + localStorage.getItem('access_token')
//         }
//     }).then(res => {
//         console.log(res);
//     }).catch(error => {
//         postRefresh()
//         chkToken()
//     })
// }


// export default chkToken



// mypageTest

// const onSubmit = async (e)=>{
//     e.preventDefault();
//     await axios.get('http://127.0.0.1:8081/api/users', {
//       headers: {
//           "Content-Type": "application/json",
//           "Authorization": "Bearer " + localStorage.getItem('access_token')
//       }
//   }).then(res => {
//       console.log(res);
//   }).catch(error => {
//       postRefresh() // 재발행 하고 local에 넣어주는 함수
//       onSubmit(e)
//   })
// }