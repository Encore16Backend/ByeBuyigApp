import axios from 'axios'

export default function setAuthorizationToken(token){
    if (token){
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        // api요청하는 콜마다 헤더에 accessToken 담아 보내도록 설정
    }else{
        delete axios.defaults.headers.common['Authorization'];
    }
}

// NOTE. access token은
// (1) query string
// (2) HTTP request header-"Authorization: Bearer "형식
// 에 포함시키는 두 가지 방법이 있지만,
//  query string은 서버 로그에 기록이 남을 수 있어 보안상의 이유로 잘 쓰지 않는다