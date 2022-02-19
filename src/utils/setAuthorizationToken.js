import axios from 'axios'
import { logOut } from '../redux/user/actions';
import { Dispatch } from 'redux';

export default function setAuthorizationToken(token){
    // 토큰이 있으면 header에 포함시키고, 없으면 그 부분을 지우는 함수
    if (token){
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        // api요청하는 콜마다 헤더에 accessToken 담아 보내도록 설정
    }else{
        delete axios.defaults.headers.common['Authorization'];
    }
}

// NOTE. access token은
// (1) query string
// (2) HTTP request header - "Authorization: Bearer "형식
// 에 포함시키는 두 가지 방법이 있지만,
//  query string은 서버 로그에 기록이 남을 수 있어 보안상의 이유로 잘 쓰지 않는다