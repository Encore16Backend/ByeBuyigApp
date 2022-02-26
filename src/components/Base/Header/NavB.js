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

    // 검색
    // 카테고리 상의(1) 하의(4) 스커트(?) 아우터(7) (반팔(10) 긴팔(11) 셔츠 반바지(13) 슬랙스 데님팬츠 미니스커트 롱스커트 롱패딩 숏패딩 코트 트렌치코트  )
    const [keyword, setKeyword] = useState('')
    const cataNum = useSelector(state => state.cataNum.items)
    
    const changeKeyword = (e)=>{
      setKeyword(e.target.value)
    }
    const onSubmit = (e)=>{
      e.preventDefault();
      if (!!cataNum){ // 특정 카테고리 페이지가 아니면 id없이 날려

      }else{
        // 특정 카테고리 페이지이면 이 id를 가지고 요청을 날려
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
          <Navbar.Brand href={"/"} >BuyBuying</Navbar.Brand>
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
             {/* 검색폼 */}
             <Form className="d-flex" onSubmit={onSubmit}>
                <FormControl type="search" placeholder="Search" className="me-2" aria-label="Search"
                  value={keyword} onChange={changeKeyword}
                />
             <Button type="submit" variant="outline-success">Search</Button>
            </Form>
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
