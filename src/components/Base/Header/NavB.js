import { BrowserRouter as Router, Switch, Route,Link, NavLink
} from 'react-router-dom';
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import React, {useState} from 'react';
import SingUpModal from '../../../modals/SignUpModal';
import SingInModal from '../../../modals/SignInModal';


const NavB = ()=>{
    const [singUpModalOn, setSingUpModalOn]= useState(false) // 회원가입
    const [SingInModalOn, setSingInModalOn] =useState(false) // 로그인
    const closeHander = ()=>{
      
    }
    // ()=>{setSingUpModalOn(false)}
    return(
        <>
        <Navbar bg="dark" variant="dark">
          <Container>
          <SingUpModal show={singUpModalOn} onHide = {()=>{setSingUpModalOn(false)}}/> {/* 회원가입 */}
          <SingInModal show={SingInModalOn} onHide = {()=>{setSingInModalOn(false)}}   />
          <Navbar.Brand href="#home">BuyBuying</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href={"/"}>Home</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link onClick={()=>{setSingInModalOn(true)}}>로그인</Nav.Link>
            <Nav.Link onClick={()=>{setSingUpModalOn(true)}}>회원가입</Nav.Link>
          </Nav>
          </Container>
        </Navbar>
        </>
    )
}

export default NavB
