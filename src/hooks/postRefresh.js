import axios from "axios";

// 리프레쉬 토큰을 요청하는 함수 요청 후 로컬스토리지에 담음
const postRefresh = async ()=>{
    await axios.get('http://127.0.0.1:8081/api/token/refresh', {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + sessionStorage.getItem('refresh_token')
        }
    }).then(res => {
        sessionStorage.setItem('access_token', res.data.access_token);
    }).catch(error => {
        
    })
}


export default postRefresh