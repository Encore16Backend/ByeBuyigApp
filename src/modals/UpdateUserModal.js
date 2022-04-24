import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useState, useEffect, useRef } from "react";
import Test from "../components/auth/Test";
import axios from "axios";
import "../css/join.css" 
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import '../axiosproperties'
import { set } from "lodash";
import { Nav } from "react-bootstrap";
import { addPants } from "../redux/bestItem/actions";

function UpdateUserModal({ show, onHide, data }) {


  // defaultLocationIdx: 0
  // email: "bigboyang@naver.com"
  // id: 7
  // locations: Array(1)
  // 0: {id: 22, location: '경기 파주시 광탄면 어가길 8 (신산리, 마포숯불갈비)/10948/103-234'}
  // length: 1
  // [[Prototype]]: Array(0)
  // password: "$2a$10$B7uX9N6BCOY4FpQTUIaL9.imeZ3vn5w9/ipuR3aqdsfiRwbvRqZi6"
  // roles:
  // id: 1
  // name: "ROLE_USER"
  // [[Prototype]]: Object
  // username: "qwerqwerqwer"

  // 0 : 기본 , 1 : 다른곳 , 2 : 또 다른곳
  let [addpost, setAddpost] = useState(0);
  // 배송지명
  console.log(data, "data")

  let temp = data.locations
  let address = [];

  const getOnlyLocation = (temp) =>{
    for (let i = 0; i<3; i++){
      let tmp = [];
      if (!!temp[i]){
        tmp = temp[i].location.split('/')
      }else{
        tmp = ['','','','']
      }
      address.push(tmp)
    }
  }
  getOnlyLocation(temp)
  let [locations, setLocation] = useState(address);
  
  

  console.log(locations, "locations")
  



  
// 0: (3) ['서울 마포구 포은로 5 (합정동)', '04020', '103-234']
// 1: (4) ['전북 장수군 장수읍 아건너길 3-5 (장수리)', '55636', '3', '회사']
// 2: (4) ['서울 강동구 아리수로 46 (암사동)', '05237', '배송지', '새로운']




  const history = useHistory();
  // 관리자 회원수정
  const onSubmit = async (e) => {
    e.preventDefault();
    let loc1 = locations[0].join('/')
    let loc2 = locations[1].join('/')
    let loc3 = locations[2].join('/')
    await axios.post('api/user/update/admin',{
      username : id,
      password : pwd, 
      locations : [{location:loc1},{location:loc2},{location:loc3} ],
      email : email,
    },{
      headers: {
        "Content-Type": "application/json",
      },
    }).then(res =>{
      closeHander();
      alert('회원수정 성공')
      window.location.replace("/manageuser")
    }).catch(error =>{
      console.log(error)
      alert("회원수정 오류")
      alert(error)
    })
    setEmailMsg('');
    setPwdMsg('');
  }

  // id관련
  const [id, setID] = useState(data.username)
  const [checkID, setCheckID] = useState(true)
  const [idmsgStyle,setidmsgStyle] =useState('invalid-input')
  
  const onIdValid = (e) => {
    setCheckID(false);
    const regExp = /[^a-z0-9+]$/g;
    const curValue = e.currentTarget.value;
    if (!regExp.test(curValue)){
      setID(curValue);
      // setCheckID(true); db없이 체크용
    }
  }

  const duplicateId = async () => {
    if(id === ''){
      alert("아이디를 입력하세요");
    }
    else if(id.length < 6){
      alert("아이디는 6자 이상이어야 합니다.");
    } else {
      await axios.get("/api/checkUser", {
      params: {
        username: id
      }
      }, {
        headers: {
          "Content-Type": "application/json"
        }
      }).then(res => {

        if(res.data === 'FAIL') {
            alert("중복된 아이디입니다")
        }
        else {
          alert("사용 가능한 아이디입니다.");
          setCheckID(true);
        }
      })
    }
    
  }

  // pwd관련

  const [pwd, setPwd] = useState('')
  const [chkPwd, setChkPwd] = useState('')
  const [valchkPwd, setvalchkPwd] = useState(0) // 0 기본 1 성공 -1 실패
  const [pwdStyle, setPwdStyle]= useState('')
  const [pwdMsg, setPwdMsg]= useState('')

  const onPwdValid = (e)=>{
    setPwd(e.target.value)
    if (e.target.value === chkPwd && chkPwd != '') {
      setvalchkPwd(1) 
      setPwdStyle('valid-input')
      setPwdMsg('※ 비밀번호 확인 성공')
    }
    else if (e.target.value != chkPwd &&  chkPwd != ''){
      if (e.target.value === ""){
        setvalchkPwd(0) 
      }else{
        setvalchkPwd(-1) 
        setPwdStyle('invalid-input')
        setPwdMsg('※ 비밀번호 확인 실패')
      }
    }
  }


  const onChkPwdValid = (e)=>{
    setChkPwd(e.target.value)         
    if ( e.target.value === pwd && pwd != "") {
      setvalchkPwd(1)
      setPwdStyle('valid-input')
      setPwdMsg('※ 비밀번호 확인 성공')
    }
    else if (e.target.value != pwd){
      if (e.target.value === ""){
        setvalchkPwd(0)
        setPwdMsg('')
      }else{
        setvalchkPwd(-1) 
        setPwdStyle('invalid-input')
        setPwdMsg('※ 비밀번호 확인 실패')
      }
    }
  }

  
  // 주소관련
  const [isAddress, setIsAddress] = useState(locations[0][0]);
  const [detailAddress,setdetailAddress] = useState(locations[0][2])
  // 우편번호 관련  
  const [isZoneCode, setIsZoneCode] = useState(locations[0][1]);
  
  // 이메일 관련
  const [email, setEmail] = useState(data.email)
  const [chkMail,setChkMail]=useState('')
  const [valemail, setvalemail] = useState(-1) // 0 기본상태 1성공 -1실패
  const [emailMsg , setEmailMsg] = useState('')
  const [emailStyle, setEmailStyle]= useState('')
  const [keycode,setKeycode] = useState('')
  const [valkeycode,setvalKeycode] = useState(-1)


 
  // 이메일 검증 함수
  const onEmail = (e)=>{
    setvalemail(-1);
    setEmail(e.target.value)
    const test = e.target.value
    setKeycode('')
    var regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i
    const valMyEmail = regExp.test(e.target.value)
    if (valMyEmail && test != '') {
      setEmailMsg('※ 이메일 형식 일치')
      setvalemail(1)
      setEmailStyle('valid-input')
    } 
    else if (valMyEmail != test){ // 이메일이 형식에 맞지 않으면
      if (test === ""){ // 이메일이 형식에 맞지 않고 input이 빈값이면
        setvalemail(-1)
        setEmailMsg('')
      }else{
        // 이메일이 형식에 맞지 않고 input이 빈값이 아니면
        setEmailMsg('※ 이메일 형식 불일치')
        setvalemail(-1)
        setEmailStyle('invalid-input')
      }
    }
    
  }


  
 
  const [buttonRef, setButtonRef] = useState(false); // 버튼을 disable을 toggle하기 위해 만든 Ref

  // 유효성 체크값들이 모두true가 되면 true를 리턴하여 회원가입 버튼을 활성화 시키는 함수
  const getActivate = () => {
    return ( true  ) //  checkID === true && valemail === 1 && valkeycode===1 && valchkPwd === 1
  }
  // getActivate함수가 활성화되면 자동으로 회원가입 버튼을 활성화시킴
  useEffect(() => { 
    if (!getActivate() ) {
      setButtonRef(true);
    } else {
      setButtonRef(false);
    }
  }, [checkID, valchkPwd, valemail,valkeycode]) // valname


  // 모달창을 닫고 state들을 초기화 시키는 함수
  const closeHander = ()=>{
    setID('')
    setCheckID(false)
    setPwd('')
    setvalchkPwd(0)
    setChkPwd('')
    setIsAddress('')
    setIsZoneCode('')
    setEmail('')
    setvalemail(0)
    setEmailMsg('')
    setPwdMsg('')
    onHide()
    setvalKeycode(-1)
    setdetailAddress('')
    setChkMail('')
  }
  
  //이메일 인증
  const checkMail = async (e)=>{
    e.preventDefault();
    await axios.get('/api/checkMail', {
        params :{
            email:email
        }

    }, {
        headers: {
            "Content-Type": "application/json",
        },
    }).then(res => {
      console.log(res.data)
      if (res.data ==="EXIST"){
        alert("중복된 이메일입니다")
        setvalemail(-1)
      } else{
        setKeycode(res.data)
        alert(email+ ' 메일로 인증코드를 전송했습니다')
        console.log()
      }

    }).catch(error => {
      console.log(error)
    })
};

    const onchkMail =(e)=>{
      setChkMail(e.target.value)
      setvalKeycode(-1)
    }
   
    const okmail =(e)=> {
      if (keycode != "" && keycode ===chkMail){
        alert("인증코드가 일치합니다")
        setvalKeycode(1)
        
      }else {
        alert("인증코드가 틀렸습니다")
        setvalKeycode(-1)
      }
    }

  // 배송지명
  const onposttitle =(e) => {
    const temp = [...locations]
    temp[addpost][3] = e.target.value
    setLocation(temp)
    // setLocName({
    //   ...locName,
    //   [addpost]:e.target.value
    // })
  }

  const onAllAddr = (target1, target2)=>{
    const temp = [...locations];
    temp[addpost][0] = target1;
    temp[addpost][1] = target2;
    setLocation(temp)
  }

  const ondetailAddress = (e) =>{
    const temp = [...locations];
    temp[addpost][2] = e.target.value;
    setLocation(temp)
  }

    
  return (
    <Modal
      show={show}
      onHide={closeHander}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          회원수정
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <>
          <Form onSubmit={onSubmit}>
            {/* ID */}
            <Form.Group className="mb-3" >
              <Form.Label>ID</Form.Label>
              <Form.Control type="text" placeholder="영문자로 시작하는 영문자 또는 숫자 6~20자" onChange={onIdValid} minLength={6} maxLength={20} value={id}/>
              <br></br>
              <Button  onClick={duplicateId}> 중복확인 </Button>
            </Form.Group>

              {/* PWD */}
              <Form.Group className="mb-3" >
              <Form.Label>password</Form.Label>
              <Form.Control type="password" className="password" placeholder="8자 이상 영문, 숫자 조합" minLength={8} maxLength={20}
                onChange={onPwdValid} value={pwd} />
            </Form.Group>

            {/* chkPWD */}
            <Form.Group className="mb-3">
              <Form.Label>password 확인</Form.Label>
              <Form.Control type="password" placeholder="비밀번호 확인"
              onChange={onChkPwdValid} 
              value={chkPwd} />
              {<div className={pwdStyle}>{pwdMsg}</div>}
            </Form.Group>
           
           {/* 주소 */}
           <>
                <>
                <Nav className="mt-5 mb-3" variant="tabs" defaultActiveKey="link-0">
                  <Nav.Item><Nav.Link eventKey="link-0" onClick={() => { setAddpost(0); } }>기본 배송지</Nav.Link></Nav.Item>
                  <Nav.Item><Nav.Link eventKey="link-1" onClick={() => { setAddpost(1); } }>{ locations[1] === undefined || locations[1][0] === '' ? "배송지추가" : locations[1][3]  }</Nav.Link></Nav.Item>
                  <Nav.Item><Nav.Link eventKey="link-2" onClick={() => { setAddpost(2); } }>{ locations[2] === undefined || locations[2][0] === '' ? "배송지추가" : locations[2][3]}</Nav.Link></Nav.Item>
                </Nav>
                </>
                <>
                <Form.Group> 
                  {(addpost === 1 || locations[addpost][3] != null ) || (addpost === 2 || locations[addpost][3] != null) ?
                    <>
                      배송지명  <Form.Control type="text" onChange={onposttitle} value={locations[addpost][3]} style={{ width: "100px" }} /> {/*   */}
                    </> : ''}
                  <Form.Label>우편번호</Form.Label>
                  <div style={{ display: 'flex' }}>
                    <Form.Control type="text" value={locations[addpost][1]} readOnly style={{ width: "80px", textAlign: "center" }} />
                    &nbsp; &nbsp;
                    <Test  onAllAddr={onAllAddr}/>
                  </div>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>주소</Form.Label>
                  <Form.Control type="text" placeholder="주소입력" value={locations[addpost][0]} readOnly />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>상세주소</Form.Label>
                  <Form.Control type="text" placeholder="상세주소입력" onChange={ondetailAddress} value={locations[addpost][2]} /> {/*  */}
                </Form.Group>
              </>
          </> 
              

               
              
         

            {/* 이메일 */}
            <Form.Group className="mb-3">
              <Form.Label>E-mail</Form.Label>
              <Form.Control type="text" placeholder="E-mail을 입력하세요" onChange={onEmail} value={email} />
              <br></br>
              <Button onClick={checkMail}>이메일 인증</Button>
              {<div className={emailStyle}>{emailMsg}</div>}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>인증코드입력 </Form.Label>
              <Form.Control  placeholder="전송된 코드를 입력하세요"
              onChange={onchkMail} value={chkMail} />
              <br></br>
              {/* <Button onClick={okmail}>코드 인증</Button> */}
              {valemail === 1 ? <Button onClick={okmail}>코드 인증</Button> : <Button disabled={true}>코드 인증</Button>}
            </Form.Group>
                <Button type="submit" disabled={buttonRef} >회원수정</Button>
                {/* <Button type="submit">회원가입</Button> */}
                {checkID === true ? null:<p className={idmsgStyle}>※ ID 중복확인 해주세요</p>}
          </Form>
  
          {/* </form> */}
        </>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={closeHander}>닫기</Button>
      </Modal.Footer>
    </Modal>
  );
}



export default UpdateUserModal