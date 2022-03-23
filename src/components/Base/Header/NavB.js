import { BrowserRouter as Router, Switch, Route,Link, NavLink
} from 'react-router-dom';
import { Navbar, Container, Nav, Button , Offcanvas, Form, FormControl} from "react-bootstrap";
import React, {useEffect, useState} from 'react';
import SingUpModal from '../../../modals/SignUpModal';
import SingInModal from '../../../modals/SignInModal';
import ImgSearchPage from '../../../pages/ImgSearchPage'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { logOut } from '../../../redux/user/actions';
import { connect, useSelector } from 'react-redux';
import "../../../css/drop.css";
import CheckModal from "../../../modals/CheckModal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';

const NavB = ({ID, logOut})=>{

  // 검색 시 사용할 카테고리명을 리덕스로 받아오고
  let cataId = useSelector(state=>state.cataNum.items)
  // navBar의 카테고리명 지역변수 만듬
  const [cataName, setCataName] = useState("")
  // 리덕스로 받아온 값이 변할때마다 cataName에 넣어줌
  useEffect(()=>{
    setCataName(cataId)
    setKeyword('')
  },[cataId])
  // select박스가 변할떄마다 cataName set
  const onCataChange = (e)=>{
    setCataName(e.target.value)
    setKeyword("")
  }  
  const cataArr = [
    "전체","상의","반팔","긴팔","바지","반바지","슬랙스","데님팬츠","아우터","코트","트렌치 코트",
    "롱패딩","숏패딩","스커트","롱스커트","미니스커트"
  ]

  // 사이드바 용 hook
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

    // login용 hook
    const [singUpModalOn, setSingUpModalOn]= useState(false) // 회원가입
    const [SingInModalOn, setSingInModalOn] =useState(false) // 로그인
    const [checkModalOn, setCheckModalOn] = useState(false) // pwd check

    // 이미지 검색용
    const [imgSearchModalOn, setImgSearchModalOn] = useState(false)

    var history = useHistory();
    const id = sessionStorage.getItem('id')

    const out = ()=>{ // logout과 동시에 home으로 이동
      logOut()
      sessionStorage.removeItem('id');
      sessionStorage.removeItem('access_token')
      sessionStorage.removeItem('refresh_token')
      sessionStorage.removeItem('roles')
      window.location.replace("/")
    }
    const [isOpen, setMenu] = useState(false);  
  


    const [keyword, setKeyword] = useState('')
    const cataNum = useSelector(state => state.cataNum.items)

    
    const changeKeyword = (e)=>{
      setKeyword(e.target.value)
    }
    const onSubmit = (e)=>{
      e.preventDefault();
      const sendCataName = cataName == "전체" ? "" : cataName
      history.push({  
        pathname: "/searchlist",
        search : "?searchName="+keyword,
        state: {
            keyword:keyword,
            cataName:sendCataName,
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
          <ImgSearchPage show={imgSearchModalOn} onHide = {()=>{setImgSearchModalOn(false)}}/>
          


                <Offcanvas show={show} onHide={handleClose}>
                    <Offcanvas.Header closeButton>
                    <Offcanvas.Title>상품목록</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                   
                   
                    </Offcanvas.Body>
                </Offcanvas> 
          <Nav className="me-auto">
             {/* 검색폼 */}
             <Form className="d-flex" onSubmit={onSubmit} style={{paddingLeft:"30px"}}>
               <div id="selectBox">
                <div className='custom-dropdown small'> 
                  <select id='selectbox' style={{height:"38px", width:"112px"}}
                    value={cataName}
                    onChange={onCataChange}>
                    {
                        cataArr.map(name =>((<option key={name} value={name}>{name}</option>)))
                    }
                  </select>
                  </div>
                </div>
                <FormControl type="search" placeholder="Search" className="me-2" aria-label="Search"
                  value={keyword} onChange={changeKeyword}
                />
             <Button type="submit" variant="outline-success">Search</Button>
            </Form>
            {/* 이미지 검색 */}
            <Nav.Link onClick={()=>{setImgSearchModalOn(true)}}>
              <FontAwesomeIcon icon={faCamera} />
            </Nav.Link>

            {/* cate */}
            <div className='NavBarCataForm'>
            {/* 상의 */}
            <div className='navBarCate dropdown' style={{display:"inline", zIndex:2}}>
            <span className='dropbtn'>
            <Link style={{color:"white"}} to={{pathname: "/searchlist",
                                        search : "?searchName=상의",
                                        state: {
                                        keyword:"",
                                        cataName:"상의",},}}> 상의</Link></span>
                <div className="dropdown-content" style={{position:"absolute", left:"1rem" ,zIndex:5}}>
                  <ul className="nav-flyout">
                        <li>
                            <span ><i className="ion-ios-color-filter-outline"></i>
                            <Link to={{ pathname: "/searchlist",
                                        search : "?searchName=반팔",
                                        state: {
                                        keyword:"",
                                        cataName:"반팔",}}}>
                                반팔
                            </Link>
                            
                            </span>
                        </li>
                        <li>
                          <span ><i className="ion-ios-clock-outline"></i>
                          <Link to={{pathname: "/searchlist",
                                        search : "?searchName=긴팔",
                                        state: {
                                        keyword:"",
                                        cataName:"긴팔",},
                          }}>
                              긴팔 
                          </Link>
                          </span>
                    </li>
                    <li>
                          <span ><i className="ion-ios-clock-outline"></i>
                          <Link to={{pathname: "/searchlist",
                                        search : "?searchName=셔츠",
                                        state: {
                                        keyword:"",
                                        cataName:"셔츠",},
                          }}>셔츠 
                          </Link>
                          </span>
                    </li>
                 </ul>
              </div>
            </div>
            {/* 하의 */}
            <div className='navBarCate dropdown' style={{display:"inline"}}>
            <span className='dropbtn'>
            <Link style={{color:"white"}} to={{pathname: "/searchlist",
                                        search : "?searchName=바지",
                                        state: {
                                        keyword:"",
                                        cataName:"바지",},}}>바지 </Link></span>
                <div className="dropdown-content" style={{position:"absolute", left:"1rem", zIndex:5}}>
                   <ul className="nav-flyout">
                      <li>
                        <span><i className="ion-ios-color-filter-outline"></i>
                        <Link to={{pathname: "/searchlist",
                                        search : "?searchName=반바지",
                                        state: {
                                        keyword:"",
                                        cataName:"반바지",},}}>반바지 </Link>
                        </span>
                      </li>
                      <li>
                        <span ><i className="ion-ios-clock-outline"></i>
                      <Link to={{pathname: "/searchlist",
                                        search : "?searchName=슬랙스",
                                        state: {
                                        keyword:"",
                                        cataName:"슬랙스",},}}>슬랙스 </Link>
                        </span>
                      </li>
                      <li>
                        <span ><i className="ion-ios-clock-outline"></i>
                      <Link to={{pathname: "/searchlist",
                                        search : "?searchName=데님팬츠",
                                        state: {
                                        keyword:"",
                                        cataName:"데님팬츠",},}}>데님팬츠 </Link>
                        </span>
                      </li>
                    </ul>
                </div>
            </div >
            {/* 아우터 */}
            <div className='navBarCate dropdown' style={{display:"inline"}}>
            <span  className='dropbtn'> 
            <Link style={{color:"white"}} to={{pathname: "/searchlist",
                                        search : "?searchName=아우터",
                                        state: {
                                        keyword:"",
                                        cataName:"아우터",},}}>아우터</Link></span>
                <div className="dropdown-content" style={{position:"absolute", left:"1rem", zIndex:5}}>
                        <ul className="nav-flyout">
                            <li>
                              <span ><i className="ion-ios-color-filter-outline"></i>
                              <Link to={{pathname: "/searchlist",
                                        search : "?searchName=코트",
                                        state: {
                                        keyword:"",
                                        cataName:"코트",},}}>코트 </Link>
                              </span>
                            </li>

                            <li>
                              <span ><i className="ion-ios-color-filter-outline"></i>
                              <Link to={{pathname: "/searchlist",
                                        search : "?searchName=트렌치 코트",
                                        state: {
                                        keyword:"",
                                        cataName:"트렌치 코트",},}}>트렌치 코트 </Link>
                              </span>
                            </li>
                            
                            <li>
                              <span ><i className="ion-ios-clock-outline"></i>
                              <Link to={{pathname: "/searchlist",
                                        search : "?searchName=롱패딩",
                                        state: {
                                        keyword:"",
                                        cataName:"롱패딩",},}}>롱패딩</Link>
                              </span>
                            </li>

                            <li>
                            <span ><i className="ion-ios-clock-outline"></i>
                            <Link to={{pathname: "/searchlist",
                                        search : "?searchName=숏패딩",
                                        state: {
                                        keyword:"",
                                        cataName:"숏패딩",},}}>숏패딩</Link>
                            </span>
                            </li>
                        </ul>
                  </div>
            </div>
            {/* 스커트 */}
            <div className='navBarCate dropdown' style={{display:"inline"}}>
            <span className='dropbtn'>
            <Link style={{color:"white"}} to={{pathname: "/searchlist",
                                        search : "?searchName=스커트",
                                        state: {
                                        keyword:"",
                                        cataName:"스커트",},}}>스커트</Link> 
            </span>
              <div className="dropdown-content" style={{position:"absolute", left:"1rem", zIndex:5}}>
                <ul className="nav-flyout">
                    <li>
                      <span ><i className="ion-ios-color-filter-outline"></i>
                      <Link to={{pathname: "/searchlist",
                                        search : "?searchName=롱스커트",
                                        state: {
                                        keyword:"",
                                        cataName:"롱스커트",},}}>롱스커트</Link>
                      </span>
                    </li>
                    <li>
                      <span ><i className="ion-ios-color-filter-outline"></i>
                      <Link to={{pathname: "/searchlist", 
                                        search : "?searchName=미니스커트",
                                        state: {
                                        keyword:"",
                                        cataName:"미니스커트",},}}>미니스커트</Link>
                      </span>
                    </li>
                  </ul>
                </div>
            </div>
            </div>
          </Nav>

          
          

          <Nav>
          {
              (!!id) // !! (null undefined '' 등 모든 false형 값이면)
              ?
              (sessionStorage.getItem('roles') ==='ROLE_ADMIN')?
              <>
                <div className='NavBarCataForm'>
                  <div className='navBarCate dropdown' style={{display:"inline"}}>
                  <span className='dropbtn'>
                    <Link style={{color:"white"}}>{id}</Link> 
                    </span>
                  <div className="dropdown-content" style={{position:"absolute", left:"1rem", textAlign:'left',zIndex:5}}>
                    <ul className="nav-flyout">
                        <li>
                          <span ><i className="ion-ios-color-filter-outline"></i>
                          <Link to={{
                            pathname:"/manageuser"
                          }}>회원 관리 </Link>
                          </span>
                        </li>
                        <li>
                          <span ><i className="ion-ios-color-filter-outline"></i>
                          <Link to={{pathname:"/managereview"}}>리뷰 관리</Link>
                          </span>
                        </li>
                        <li>
                          <span ><i className="ion-ios-color-filter-outline"></i>
                          <Link to={{pathname:"/manageInquiry"}}>문의 사항</Link>
                          </span>
                        </li>
                        <li>
                          <span ><i className="ion-ios-color-filter-outline"></i>
                          <Link to={{pathname:"/manageproduct"}}>상품 관리</Link>
                          </span>
                        </li>
                        <li>
                          <span ><i className="ion-ios-color-filter-outline"></i>
                          <Link to={{pathname:"/saveproduct"}}>상품 등록</Link>
                          </span>
                        </li>
                        <li>
                          <span onClick={out}><i className="ion-ios-color-filter-outline"></i>
                          <Link to={{pathname:"/"}}>로그아웃</Link>
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                </>:
              <>
                <div className='NavBarCataForm'>
                  <div className='navBarCate dropdown' style={{display:"inline"}}>
                  <span className='dropbtn'>
                    <span style={{color:"white"}}>{id}</span> 
                    </span>
                  <div className="dropdown-content" style={{position:"absolute", left:"1rem", textAlign:'left',zIndex:5}}>
                    <ul className="nav-flyout">
                        <li>
                          <span><i className="ion-ios-color-filter-outline"></i>
                          <span><CheckModal show={checkModalOn} onHide = {()=>{setCheckModalOn(false)}}/></span>
                          </span>
                        </li>
                        <li>
                          <span ><i className="ion-ios-color-filter-outline"></i>
                          <Link to={{
                            pathname:"/basket"
                          }}>장바구니</Link>
                          </span>
                        </li>
                        <li>
                          <span ><i className="ion-ios-color-filter-outline"></i>
                          <Link to={{pathname:"/MyReview"}}>리뷰 관리</Link>
                          </span>
                        </li>
                        <li>
                          <span ><i className="ion-ios-color-filter-outline"></i>
                          <Link to={{pathname:"/order"}}>구매내역</Link>
                          </span>
                        </li>
                        <li>
                          <span ><i className="ion-ios-color-filter-outline"></i>
                          <Link to={{pathname:"/myInquiry"}}>내 문의 내역</Link>
                          </span>
                        </li>
                        <li>
                          <span onClick={out}><i className="ion-ios-color-filter-outline"></i>
                          <Link to={{pathname:"/"}}>로그아웃</Link>
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              
              

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
