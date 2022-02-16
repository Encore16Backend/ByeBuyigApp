import React, { useCallback } from "react";
import { Modal, Button, Form, Container } from "react-bootstrap";
import { useState, useEffect, useRef } from "react";
import Test from "../components/auth/Test";
import axios from "axios";
import join from "../css/join.css"

function SingUpModal({ show, onHide }) {
  // id(pk) ,pwd, 이름, 주소, 관심패션, 이메일
  const [singUpModalOn, setSingUpModalOn]= useState(false) // 회원가입모달창

  // 회원가입 실행 함수
  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(id); 
    await axios.post('http://127.0.0.1:8080/api/join',{
      ID : id,
      USERNAME : name,
      PASSWORD : pwd, 
      LOCATION : isAddress + ' ' + isZoneCode,
      STYLE : fashion,
      EMAIL : email,
      ROLE : 0,
    },{
      headers: {
        "Content-Type": "application/json",
      },
    }).then(res =>{
      closeHander();
    }).catch(error =>{
      alert("회원가입 오류")
    })
  }

  const [id, setID] = useState('')
  const [checkID, setCheckID] = useState(false)
  
  const onIdValid = (e) => {
    setCheckID(false);
    const regExp = /[^a-z0-9+]$/g;
    const curValue = e.currentTarget.value;
    if (!regExp.test(curValue)){
      setID(curValue);
    }
  }

  const duplicateId = async () => {
    await axios.get("http://127.0.0.1:8080/api/getUser", {
      params: {
        username: id
      }
    }, {
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => {
      if(res.data) {
        alert("중복된 아이디입니다.");
      } else {
        alert("사용 가능한 아이디입니다.");
        setCheckID(true);
      }
    })
  }
  

  const [pwd, setPwd] = useState('')
  const [checkPwd, setCheckPwd] = useState(false)

  const [chkPwd, setChkPwd] = useState('')
  const [valchkPwd, setvalchkPwd] = useState(false)


  



  const [name, setName] = useState('')
  const [valname, setvalname] = useState(false)

  const [isAddress, setIsAddress] = useState('');
  const [valisAddress, setvalisAddress] = useState(false)

  const [isZoneCode, setIsZoneCode] = useState('');
  const [valisZoneCode, setvalisZoneCode] = useState(false)

  const [fashion, setFashion] = useState('')
  const [valfashion, setvalfashion] = useState(false)

  const [email, setEmail] = useState('')
  const [valemail, setvalemail] = useState(false)

  const buttonRef = useRef(Button); //submitRef

  // useEffect(()=>{
  //   setvalisAddress(true)
  //   setvalisZoneCode(true)
  // }, [isAddress, isZoneCode]) // 우편번호 검색으로 값이 생기면 유효성검사를 통과시킴

  // const getActivate = () => { // 유효성 체크값들이 true가 되면 버튼을 true를 리턴함
  //   let isOk = true
  //   if (
  //     valchkPwd === true && valname === true && valisAddress === true && valisZoneCode === true
  //     && valemail === true
  //   ) {
  //     isOk = true
  //   }
  //   return isOk
  // }

  const closeHander = ()=>{
    setID('')
    setPwd('')
    setChkPwd('')
    setName('')
    setIsAddress('')
    setIsZoneCode('')
    setFashion('')
    setEmail('')
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
                onChange={(e) => {
                  setPwd(e.target.value)
                  console.log(e.target.value)
                  if (e.target.value != chkPwd && chkPwd != '') setvalchkPwd(true)
                  else setvalchkPwd(false)
                }} value={pwd} />
            </Form.Group>

            {/* chkPWD */}
            <Form.Group className="mb-3">
              <Form.Label>password 확인</Form.Label>
              <Form.Control type="password" placeholder="비밀번호 확인" pattern="^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]"
              onChange={(e) => {
                setChkPwd(e.target.value)         
                if (e.target.value === pwd) setvalchkPwd(false)
                else setvalchkPwd(true)
              }} value={chkPwd} />
              {valchkPwd && <div className="invalid-input">※ 패드워스가 일치하지 않습니다.</div>}
            </Form.Group>

            {/* name */}
            <Form.Group className="mb-3" >
              <Form.Label>이름</Form.Label>
              <Form.Control type="text" placeholder="이름입력" onChange={(e) => {
                const korean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/gi; // 한글 정규표현식
                setName(e.target.value)
                var regExp = /[ㄱ-힣]/;
                // 한글만 입력
                const NameValid = regExp.test(e.target.value)     
                if (NameValid) {
                  setvalname(true)
                } else {
                  setvalname(false)
                }

              }} value={name} />
            </Form.Group>
            {/* 주소 API */}
            <Test setIsAddress={setIsAddress} setIsZoneCode={setIsZoneCode} />
            <br></br>
            {/* ADDR */}
            <Form.Group className="mb-3">
              <Form.Label>상세주소</Form.Label>
              <Form.Control type="text" placeholder="상세주소입력" onChange={(e) => {
                setIsAddress(e.target.value)
                const Addr = e.target.value
                
                if (Addr === true) {
                  setvalisAddress(true)
                } else {
                  setvalisAddress(false)
                }
              }} value={isAddress} />
            </Form.Group>
            {/* ZIP */}
            <Form.Group className="mb-3">
              <Form.Label>우편번호</Form.Label>
              <Form.Control type="text" placeholder="우편번호입력" onChange={(e) => {
                setIsZoneCode(e.target.value)
                const zip = e.target.value
                if (zip === true) {
                  setvalisZoneCode(true)
                } else {
                  setvalisZoneCode(false)
                }

              }} value={isZoneCode} />
            </Form.Group>

            {/* 관심패션 */}
            <Form.Group className="mb-3">
              <Form.Label>평상시 스타일 (미선택시 선호스타일으로 분류)</Form.Label>
              <Form.Select aria-label="Default select example" onChange={(e) => {
                setFashion(e.target.value)
              }} value={fashion}>
                <option value="1">아직없음</option>
                <option value="2">캐주얼</option>
                <option value="3">미니멀</option>
                <option value="4">스트릿</option>
                <option value="5">시티보이</option>
                <option value="6">아메카지</option>
              </Form.Select>
            </Form.Group>
            {/* 이메일 */}
            <Form.Group className="mb-3">
              <Form.Label>E-mail</Form.Label>
              <Form.Control type="text" placeholder="E-mail을 입력하세요" onChange={(e) => {
                setEmail(e.target.value)
                var regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i
                // 형식에 맞는 경우 true 리턴
                const valMyEmail = regExp.test(e.target.value)
                if (valMyEmail) {
                  setvalemail(true)
                } else {
                  setvalemail(false)
                }
              }} value={email} />
            </Form.Group>
            {
              checkID ?
              <>
                <Button type="submit">회원가입</Button>
              </> :
              <>
                <Button onClick={duplicateId}>중복확인</Button>
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