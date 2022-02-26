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
              <a Link onClick={tocheck}>개인정보수정</a>
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


    // if (!localStorage.getItem('access_token')){
    //   console.log('navB 토큰없음')
    //   const refreshToken = async () =>{
    //     await axios.post('http://127.0.0.1:8081/token/refresh', {
    //       refresh_token:localStorage.getItem('refresh_token'),
    //       access_token:localStorage.getItem('access_token'),
    //   }, {
    //       headers: {
    //           "Content-Type": "application/json",
    //         },
    //   }).then(res => {
    //       setAuthorizationToken(res.data.access_token)
    //       localStorage.setItem('refresh_token', res.data.refresh_token)
    //       localStorage.setItem('access_token', res.data.access_token) 
    //   }).catch(error => {
    //       console.log('navB')
    //   })
    //   }
    //   refreshToken()
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
        history.push('/mypage') 
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
