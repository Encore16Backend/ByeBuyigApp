import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useState, useEffect, useRef } from "react";
import Test from "../components/auth/Test";
import axios from "axios";
import join from "../css/join.css" 
import {connect} from 'react-redux'

function SingUpModal({ show, onHide }) {
  // id(pk) ,pwd, 이름?, 주소, 관심패션, 이메일

  // 회원가입 실행 함수
  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://127.0.0.1:8081/api/user/save',{
      username : id,
      password : pwd, 
      location : isAddress + ' ' + isZoneCode,
      style : fashion,
      email : email,
    },{
      headers: {
        "Content-Type": "application/json",
      },
    }).then(res =>{
      closeHander();
      alert('회원가입 성공')
    }).catch(error =>{
      console.log(error)
      alert("회원가입 오류")
    })
    setEmailMsg('');
    setPwdMsg('');
  }

  // id관련
  const [id, setID] = useState('')
  const [checkID, setCheckID] = useState(false)
  
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
    await axios.get("http://127.0.0.1:8081/api/checkUser", {
      params: {
        username: id
      }
    }, {
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => {
      if(res.data === 'FAIL') {
        alert("중복된 아이디입니다.");
      } else {
        alert("사용 가능한 아이디입니다.");
        setCheckID(true);
      }
    })
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

  
  // 상세 주소관련
  const [isAddress, setIsAddress] = useState('');
  const [valisAddress, setvalisAddress] = useState(false)
  const onIsAddress = (e)=>{
    setIsAddress(e.target.value)
    const Addr = e.target.value
    if (Addr === true) {
      setvalisAddress(true)
    } else {
      setvalisAddress(false)
    }
  }

  // 우편번호 관련  
  const [isZoneCode, setIsZoneCode] = useState('');
  const [valisZoneCode, setvalisZoneCode] = useState(false)

  const onIsZoneCode = (e)=>{
    setIsZoneCode(e.target.value)
    const zip = e.target.value
    if (zip === true) {
      setvalisZoneCode(true)
    } else {
      setvalisZoneCode(false)
    }
  }

  // 우편번호 검색으로 값이 생기면 유효성검사를 통과시키는 함수
  const OnAddr = ()=>{
      setvalisAddress(true)
      setvalisZoneCode(true) 
  }

  // 패션관련
  const [fashion, setFashion] = useState('')
  
  // 이메일 관련
  const [email, setEmail] = useState('')
  const [valemail, setvalemail] = useState(0) // 0 기본상태 1성공 -1실패
  const [emailMsg , setEmailMsg] = useState('')
  const [emailStyle, setEmailStyle]= useState('')

  // 이메일 검증 함수
  const onEmail = (e)=>{
    setEmail(e.target.value)
    var regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i
    const valMyEmail = regExp.test(e.target.value)
    if (valMyEmail && email != '') {
      setvalemail(1)
      setEmailMsg('※ 이메일 형식 일치')
      setEmailStyle('valid-input')
    } 
    else if (!(valMyEmail)){ // 이메일이 형식에 맞지 않으면
      if (e.target.value === ""){ // 이메일이 형식에 맞지 않고 input이 빈값이면
        setvalemail(0)
        setEmailMsg('')
      }else{
        setvalemail(-1) // 이메일이 형식에 맞지 않고 input이 빈값이 아니면
        setEmailMsg('※ 이메일 형식 불일치')
        setEmailStyle('invalid-input')
      }
    }
  }

  const [buttonRef, setButtonRef] = useState(false); // 버튼을 disable을 toggle하기 위해 만든 Ref

  // 유효성 체크값들이 모두true가 되면 true를 리턴하여 회원가입 버튼을 활성화 시키는 함수
  const getActivate = () => {
    return (checkID === true && valchkPwd === 1 && valisAddress === true && valisZoneCode === true && valemail === 1) // valname === true
  }
  // getActivate함수가 활성화되면 자동으로 회원가입 버튼을 활성화시킴
  useEffect(() => { 
    if (!getActivate() ) {
      setButtonRef(true);
    } else {
      setButtonRef(false);
    }
  }, [checkID, valchkPwd, valisAddress, valisZoneCode, valemail]) // valname


  // 모달창을 닫고 state들을 초기화 시키는 함수
  const closeHander = ()=>{
    setID('')
    setCheckID(false)
    setPwd('')
    setvalchkPwd(0)
    setChkPwd('')
    setIsAddress('')
    setvalisAddress(false)
    setIsZoneCode('')
    setvalisZoneCode(false)
    setFashion('')
    setEmail('')
    setvalemail(0)
    setEmailMsg('')
    setPwdMsg('')
    onHide()
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
          회원가입
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <>
          <Form onSubmit={onSubmit}>
            {/* ID */}
            <Form.Group className="mb-3" >
              <Form.Label>ID</Form.Label>
              <Form.Control type="text" placeholder="영문자로 시작하는 영문자 또는 숫자 6~20자" onChange={onIdValid} minLength={6} maxLength={20} value={id}/>
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

            {/* name 
            <Form.Group className="mb-3" >
              <Form.Label>이름</Form.Label>
              <Form.Control type="text" placeholder="이름입력" onChange={
                onNameValid
              } value={name} />
            </Form.Group>
            */}

            {/* 주소 API */}
            <a onClick={OnAddr}>
            <Test setIsAddress={setIsAddress} setIsZoneCode={setIsZoneCode}/>
            </a>
            <br></br>

            {/* ADDR */}
            <Form.Group className="mb-3">
              <Form.Label>상세주소</Form.Label>
              <Form.Control type="text" placeholder="상세주소입력" onChange={
                onIsAddress
              } value={isAddress} />
            </Form.Group>

            {/* ZIP */}
            <Form.Group className="mb-3">
              <Form.Label>우편번호</Form.Label>
              <Form.Control type="text" placeholder="우편번호입력" onChange={
                onIsZoneCode
              } value={isZoneCode} />
            </Form.Group>

            {/* 관심패션 */}
            <Form.Group className="mb-3">
              <Form.Label>선호하는 스타일 (미선택시 선호 스타일 없음으로 분류)</Form.Label>
              <Form.Select aria-label="Default select example" onChange={(e) => {
                setFashion(e.target.value)
              }} value={fashion}>
                <option value="1" >없음</option>
                <option value="2" >캐주얼</option>
                <option value="3" >미니멀</option>
                <option value="4" >스트릿</option>
                <option value="5" >시티보이</option>
                <option value="6" >아메카지</option>
              </Form.Select>
            </Form.Group>

            {/* 이메일 */}
            <Form.Group className="mb-3">
              <Form.Label>E-mail</Form.Label>
              <Form.Control type="text" placeholder="E-mail을 입력하세요" onChange={onEmail} value={email} />
              {<div className={emailStyle}>{emailMsg}</div>}
              
              
            </Form.Group>
            {
              checkID ?
              <>
                <Button type="submit" disabled={buttonRef} >회원가입</Button>
              </> :
              <>
                <Button  onClick={duplicateId}> 중복확인 </Button>
              </>
            }
          </Form>
          {/* </form> */}
        </>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={closeHander}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}



export default SingUpModal