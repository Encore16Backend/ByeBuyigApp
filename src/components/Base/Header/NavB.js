import { BrowserRouter as Router, Switch, Route,Link, NavLink, withRouter
} from 'react-router-dom';
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import SingUpModal from '../../../modals/SignUpModal';
import SingInModal from '../../../modals/SignInModal';
import { connect } from 'react-redux';
import { logOut } from '../../../redux/user/actions';
import { Redirect } from 'react-router-dom';
import setAuthorizationToken from '../../../utils/setAuthorizationToken';
import { useHistory } from 'react-router-dom';


const NavB = ({ID, logOut})=>{
    const [singUpModalOn, setSingUpModalOn]= useState(false) // 회원가입
    const [SingInModalOn, setSingInModalOn] =useState(false) // 로그인
    var history = useHistory();
    

    const out = ()=>{ // logout과 동시에 home으로 이동
      logOut()
      setAuthorizationToken(null)
      history.push('/')
      
      
    }
    const toMyPage = ()=>{


      
      history.push('/mypage')
      
      
    }
    
    return(
        <>
        <Navbar bg="dark" variant="dark">
          <Container>
          <SingUpModal show={singUpModalOn} onHide = {()=>{setSingUpModalOn(false)}}/> {/* 회원가입 */}
          <SingInModal show={SingInModalOn} onHide = {()=>{setSingInModalOn(false)}}   />
          <Navbar.Brand href={"/"}>BuyBuying</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href={"/"}>Home</Nav.Link>
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
