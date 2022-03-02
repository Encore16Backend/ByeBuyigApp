import { BrowserRouter as Router, Switch, Route,Link, NavLink
} from 'react-router-dom';
import { Navbar, Container, Nav, Button , Offcanvas, Form, FormControl} from "react-bootstrap";
import React, {useState} from 'react';
import SingUpModal from '../../../modals/SignUpModal';
import SingInModal from '../../../modals/SignInModal';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { logOut } from '../../../redux/user/actions';
import { connect, useSelector } from 'react-redux';
import axios from 'axios'
import "../../../css/drop.css";
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import CheckModal from "../../../modals/CheckModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCarSide} from "@fortawesome/free-solid-svg-icons"


const NavB = ({ID, logOut})=>{

  // 사이드바 용 hook
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // login용 hook
    const [singUpModalOn, setSingUpModalOn]= useState(false) // 회원가입
    const [SingInModalOn, setSingInModalOn] =useState(false) // 로그인
    const [checkModalOn,setCheckModalOn] = useState(false) // pwd check

    var history = useHistory();
    const id = sessionStorage.getItem('id')

    const out = ()=>{ // logout과 동시에 home으로 이동
      logOut()
      sessionStorage.removeItem('id');
      sessionStorage.removeItem('access_token')
      sessionStorage.removeItem('refresh_token')
      window.location.replace("/")
    }

    const toMyPage = ()=>{
        history.push('/mypage') 
    }

    const tocheck =()=>{
      history.push('/Check')
    }


    const [isOpen, setMenu] = useState(false);  
  
    const toggleMenu = () => {
        setMenu(isOpen => !isOpen); 
        console.log(isOpen)
    }


    const [dispaly,setDisplay]=useState([false]);

    function outMouse(index) {
      let newDisplay = [...dispaly];
      newDisplay[index] = false;
      setDisplay(newDisplay);
    }


    function onMouse(index) {
      let newDisplay = [...dispaly];
      newDisplay[index] = true;
      setDisplay(newDisplay);
    }


    const List = () =>{
      return(
        <div style={{position:'relateve'}}>
          <div className="content">
            <ul className="dropdown">
              <CheckModal show={checkModalOn} onHide = {()=>{setCheckModalOn(false)}}  />
              <a>구매목록</a>
              <a>장바구니</a>
            </ul>
          </div>
        </div>
      )
    }

    const Test = () =>{
      return(
        <div>
          <input className = "dropdown" type="checkbox"></input>
          <label className="dropdownLabel" for ="dropdown">
          </label>
          <div className="content">
            <ul>
              <li>개인정보수정</li>
              <li>구매목록</li>
              <li>장바구니</li>
            </ul>
          </div>
        </div>
      )
    }

   
 
    const [keyword, setKeyword] = useState('')
    const cataNum = useSelector(state => state.cataNum.items)

    const toImgSearch = (e)=>{
      history.push({
        pathname:"/imgsearch",
      })
    }
    const changeKeyword = (e)=>{
      setKeyword(e.target.value)
    }
    const onSubmit = (e)=>{
      e.preventDefault();
      history.push({
        pathname: "/searchlist",
        search : "?searchName="+keyword,
        state: {
            keyword:keyword
        }
    })   
    }

    return(
        <>
        <Navbar bg="dark" variant="dark">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Navbar.Brand href={"/"} >BuyBuying</Navbar.Brand>
          <Container>
          <SingUpModal show={singUpModalOn} onHide = {()=>{setSingUpModalOn(false)}}/> {/* 회원가입 */}
          <SingInModal show={SingInModalOn} onHide = {()=>{setSingInModalOn(false)}}   />
          


                <Offcanvas show={show} onHide={handleClose}>
                    <Offcanvas.Header closeButton>
                    <Offcanvas.Title>상품목록</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                   
                   
                    </Offcanvas.Body>
                </Offcanvas> 
          <Nav className="me-auto">
             {/* 검색폼 */}
             <Form className="d-flex" onSubmit={onSubmit}>
                <FormControl type="search" placeholder="Search" className="me-2" aria-label="Search"
                  value={keyword} onChange={changeKeyword}
                />
             <Button type="submit" variant="outline-success">Search</Button>
            </Form>
            <Link to={{pathname:"/imgsearch"}} >이미지검색</Link>
          </Nav>

          <Nav>
          {
              (!!id) // !! (null undefined '' 등 모든 false형 값이면)
              ? 
              <>
              <Nav.Link onClick={toMyPage}>{id}</Nav.Link>
              <Nav.Link onClick={()=>toggleMenu()}>마이샵</Nav.Link>

              {isOpen == true ? <List/> : null}
              
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
