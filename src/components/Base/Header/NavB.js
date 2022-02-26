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
import chkToken from '../../../hooks/chkToken';
import "../../../css/drop.css";



const NavB = ({ID, logOut})=>{
    const [singUpModalOn, setSingUpModalOn]= useState(false) // 회원가입
    const [SingInModalOn, setSingInModalOn] =useState(false) // 로그인
    const [toRender, setToRender] = useState('')
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
    
    // }else{
    //   console.log('navB 토큰있음')
    //   console.log(localStorage.getItem('id'), 'navB localID')
    // }

    
    return(
        <>
        <Navbar bg="dark" variant="dark">
          <Container>
          <SingUpModal show={singUpModalOn} onHide = {()=>{setSingUpModalOn(false)}}/> {/* 회원가입 */}
          <SingInModal show={SingInModalOn} onHide = {()=>{setSingInModalOn(false)}}   />
          <Navbar.Brand to={"/"}>BuyBuying</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href={"/"}>Home</Nav.Link>
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
