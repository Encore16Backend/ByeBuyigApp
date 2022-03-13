import axios from 'axios'

export default function setAuthorizationToken(token){
    if (token){
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        // api요청하는 콜마다 헤더에 accessToken 담아 보내도록 설정
    }else{
        delete axios.defaults.headers.common['Authorization'];
    }
}
