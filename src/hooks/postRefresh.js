import axios from "axios";
import cookie from 'react-cookies'
import '../axiosproperties'

// 리프레쉬 토큰을 요청하는 함수 요청 후 로컬스토리지에 담음
const postRefresh = async ()=>{
    
    await axios.get('/api/token/refresh', {
        headers: {
            "Content-Type": "application/json",
            // "Authorization": "Bearer " + sessionStorage.getItem('refresh_token')
            "Authorization": "Bearer " + cookie.load('refreshCookie')
        }
    }).then(res => {
        sessionStorage.setItem('access_token', res.data.access_token);
    }).catch(error => {
        if (error.response.status === 403) {
            const { data } = error.response;
            if (data['error_message'].indexOf("The Token has expired") != -1) {
                axios.get('/api/token/refresh', {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + cookie.load('refreshCookie'),
                    }
                }).then(res => {
                    sessionStorage.setItem('access_token', res.data.access_token);
                    postRefresh()
                })
            }
        }
        else {
            console.log("tokenerror")
        }  

    })
}


export default postRefresh