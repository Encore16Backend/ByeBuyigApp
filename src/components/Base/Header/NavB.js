import { BrowserRouter as Router, Switch, Route,Link, NavLink
} from 'react-router-dom';
import { Navbar, Container, Nav, Button , Offcanvas} from "react-bootstrap";
import React, {useState} from 'react';
import SingUpModal from '../../../modals/SignUpModal';
import SingInModal from '../../../modals/SignInModal';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { logOut } from '../../../redux/user/actions';
import { connect } from 'react-redux';
import setAuthorizationToken from '../../../utils/setAuthorizationToken';
import axios from 'axios'
import chkToken from '../../../hooks/chkToken';
import SideBar from '../../sidebar'
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';


const NavB = ({ID, logOut})=>{

  // 사이드바 용 hook
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // login용 hook
    const [singUpModalOn, setSingUpModalOn]= useState(false) // 회원가입
    const [SingInModalOn, setSingInModalOn] =useState(false) // 로그인
    var history = useHistory();
    const id = localStorage.getItem('id')

    const out = ()=>{ // logout과 동시에 home으로 이동
      logOut()
      localStorage.removeItem('id');
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
      window.location.replace("/")
    }

    const toMyPage = ()=>{
      if (chkToken){
        history.push('/mypage') 
      }
    }

     
    return(
        <>
        <Navbar bg="dark" variant="dark">
          <img  onClick={handleShow} style={{width:"70px", height:"50px"}} alt="sidebar" src="img\icons\sidebar.png" />
          <Container>
          <SingUpModal show={singUpModalOn} onHide = {()=>{setSingUpModalOn(false)}}/> {/* 회원가입 */}
          <SingInModal show={SingInModalOn} onHide = {()=>{setSingInModalOn(false)}}   />

          {/* leftSideBar */}
          <Navbar.Brand to={"/"} onClick={handleShow} >BuyBuying</Navbar.Brand>
                <Offcanvas show={show} onHide={handleClose}>
                    <Offcanvas.Header closeButton>
                    <Offcanvas.Title>상품목록</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                    {/* sidebar컴포넌트  */}
                    <SideBar setShow={setShow}/>
                    </Offcanvas.Body>
                </Offcanvas> 

          <Nav className="me-auto">
            <Nav.Link href={"/"}>Home</Nav.Link>
          </Nav>
          <Nav>
          {
              (!!id) // !! (null undefined '' 등 모든 false형 값이면)
              ? 
              <>
              <Nav.Link onClick={toMyPage}>{id}</Nav.Link>
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
