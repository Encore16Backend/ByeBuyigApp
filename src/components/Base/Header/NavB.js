import { BrowserRouter as Router, Switch, Route,Link, NavLink
} from 'react-router-dom';
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import React, {useState} from 'react';
import SingUpModal from '../../../modals/SignUpModal';
import SingInModal from '../../../modals/SignInModal';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { logOut } from '../../../redux/user/actions';
import { connect } from 'react-redux';
import setAuthorizationToken from '../../../utils/setAuthorizationToken';
import axios from 'axios'


const NavB = ({ID, logOut})=>{
    const [singUpModalOn, setSingUpModalOn]= useState(false) // 회원가입
    const [SingInModalOn, setSingInModalOn] =useState(false) // 로그인
    var history = useHistory();

    const out = ()=>{ // logout과 동시에 home으로 이동
      logOut()
      localStorage.removeItem('id');
      console.log(localStorage.getItem('id'), ' logout ')
      setAuthorizationToken(null)
      history.push('/')
  
    }
    const toMyPage = ()=>{
      history.push('/mypage') 
    }

    if (!localStorage.getItem('access_token')){
      const refreshToken = async () =>{
        await axios.post('http://127.0.0.1:8081/token/refresh', {
          refresh_token:localStorage.getItem('refresh_token'),
          access_token:localStorage.getItem('access_token'),
      }, {
          headers: {
              "Content-Type": "application/json",
            },
      }).then(res => {
          setAuthorizationToken(res.data.access_token)
          localStorage.setItem('refresh_token', res.data.refresh_token)
          localStorage.setItem('access_token', res.data.access_token) 
      }).catch(error => {
          alert("아이디 혹은 비밀번호를 확인해주세요.")
      })
      }
      refreshToken()
    
    }else{
      console.log('navB 토큰있음')
    }

    
    
    return(
        <>
        <Navbar bg="dark" variant="dark">
          <Container>
          <SingUpModal show={singUpModalOn} onHide = {()=>{setSingUpModalOn(false)}}/> {/* 회원가입 */}
          <SingInModal show={SingInModalOn} onHide = {()=>{setSingInModalOn(false)}}   />
          <Navbar.Brand to={"/"}>BuyBuying</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link to={"/"}>Home</Nav.Link>
          </Nav>
          <Nav>
          {
              (ID !== '') 
              ? 
              <>
              <Nav.Link onClick={toMyPage}>{ID}</Nav.Link>
              <Nav.Link onClick={out}>로그아웃</Nav.Link>
              </>
               :
              <>
              <Nav.Link onClick={()=>{setSingInModalOn(true)}}>로그인</Nav.Link>
              <Nav.Link onClick={()=>{setSingUpModalOn(true)}}>회원가입</Nav.Link>
              </>
            }
          </Nav>
          </Container>
        </Navbar>
        </>
    )
}

const mapStateToProps = ({user})=>{
  return{
      ID : user.ID,
  }
}
const mapDispatchToProps = (dispatch) =>{
  return {
    logOut : ()=>{
          dispatch(logOut())
      }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavB)
