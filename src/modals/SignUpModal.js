import React, { useCallback } from "react";
import { Modal, Button, Form, Container } from "react-bootstrap";
import {useState, useEffect, useRef} from "react";
import Test from "../components/auth/Test";
import {useForm} from "react-hook-form"
import axios from "axios";

function SingUpModal({show, onHide}) {
      // id(pk) ,pwd, 이름, 주소, 관심패션, 이메일

      const [url, setUrl] = useState();
      // 서버 사용시 보낼 url

      // 회원가입 실행 함수
      const onSubmit = (e)=>{
          axios.post(url, {
              id : e.target.id.value,
              pwd : e.target.pwd.value,
              chkPwd : e.target.chkPwd.value,
              name : e.target.name.value,
              isAddress : e.target.isAddress.value,
              isZoneCode : e.target.isZoneCode.value,
              fashion : e.target.fashion.value,
              email : e.target.email.value,
          },{
              headers : {
                  "Content-Type":"application/json",
              }
          }).then((res)=>{
              console.log('회원가입 성공')
              console.log(
                  res
              )
          }).catch((cat)=>{
              console.log("회원가입 실패")
          })  
        
      }
      
      const [id, setID] = useState('')
      const [idMsg, setIDMsg] = useState('')
      const [valID, setvalID] = useState(false)

      const [pwd, setPwd] = useState('')
      const [pwdMsg, setpwdMsg] = useState('')
      const [valPwd, setvalPwd] = useState(false)

      const [chkPwd, setChkPwd] = useState('')
      const [chkPwdMsg, setchkPwdMsg] = useState('')
      const [valchkPwd, setvalchkPwd] = useState(false)

      const [name, setName] = useState('')
      const [nameMsg, setNameMsg] = useState('')
      const [valname, setvalname] = useState(false)

      const [isAddress, setIsAddress] = useState('');
      const [isAddressMsg, setIsAddressMsg] = useState('')
      const [valisAddress, setvalisAddress] = useState(false)

      const [isZoneCode, setIsZoneCode] = useState('');
      const [isZoneCodeMsg, setIsZoneCodeMsg] = useState('')
      const [valisZoneCode, setvalisZoneCode] = useState(false)

      const [fashion, setFashion] = useState('')
      const [fashionMsg, setFashionMsg] = useState('')
      const [valfashion, setvalfashion] = useState(false)

      const [email, setEmail] = useState('')
      const [emailMsg, setEmailMsg] = useState('')
      const [valemail, setvalemail] = useState(false)

      const buttonRef = useRef(null); // submitRef
      var [subButton, setSubButton] = useState(false)

      const getActivate = ()=>{
            
      }

      useEffect(()=>{
        console.log('들어옴')
        if (getActivate()){
            buttonRef.current.disabled = false;
        }else{

        }
      }, [valID, valPwd, valchkPwd,valname,valisAddress,valisZoneCode,valfashion,valemail ])
  
    return (
      <Modal
        show = {show}
        onHide = {onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
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
                <Form.Control type="text" placeholder="영문자로 시작하는 영문자 또는 숫자 6~20자" onChange={(e)=>{
                setID(e.target.value)
                var regExp = /^[a-z]+[a-z0-9]{5,19}$/g;
                // 영문자로 시작하는 영문자 또는 숫자 6~20자
	            console.log('ID 유효성 검사 :: ', regExp.test(e.target.value))
                if (regExp.test(e.target.value) === false){ // 유효성 여부에 따라 submit버튼 활성화
                    setvalID(false)
                }else{
                    setvalID(true)
                }
            }}  value={id}/>
                
            </Form.Group>
             {/* PWD */}
            <Form.Group className="mb-3" >
                <Form.Label>password</Form.Label>
                <Form.Control type="password" placeholder="8 ~ 10자 영문, 숫자 조합"onChange={(e)=>{
                setPwd(e.target.value)
                //  8 ~ 10자 영문, 숫자 조합
                var regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,10}$/
                console.log('비밀번호 유효성 검사 :: ', regExp.test(e.target.value))
                if (regExp.test(e.target.value) === false){
                    setvalPwd(false)
                }else{
                    setvalPwd(true)
                }
            }} value={pwd}/>
            </Form.Group>
              {/* chkPWD */}
              <Form.Group className="mb-3">
                <Form.Label>password</Form.Label>
                <Form.Control type="password" placeholder="비밀번호 확인"onChange={(e)=>{
                setChkPwd(e.target.value)
                var regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,10}$/
                console.log('비밀번호2 유효성 검사 :: ', regExp.test(e.target.value))
                if (regExp.test(e.target.value) === false){
                   
                }
            }} value={chkPwd}/> 
            </Form.Group>
             {/* name */}
             <Form.Group className="mb-3" >
                <Form.Label>이름</Form.Label>
                <Form.Control type="text" placeholder="이름입력"onChange={(e)=>{
                setName(e.target.value)
                var regExp = /[ㄱ-힣]/;
                // 한글만 입력
                console.log('이름 유효성 검사 :: ', regExp.test(e.target.value))
                if (regExp.test(e.target.value) === false){
                   
                }

            }} value={name}/>
            </Form.Group>
            {/* 주소 API */}
            <Test setIsAddress={setIsAddress} setIsZoneCode={setIsZoneCode}/>
            <br></br>
            {/* ADDR */}
            <Form.Group className="mb-3">
                <Form.Label>상세주소</Form.Label>
                <Form.Control type="text" placeholder="상세주소입력"onChange={(e)=>{
                setIsAddress(e.target.value)
                if (isAddress === ''){
                    
                }
                
            }} value={isAddress}/>
            </Form.Group>
            {/* ZIP */}
            <Form.Group className="mb-3">
                <Form.Label>우편번호</Form.Label>
                <Form.Control type="text" placeholder="우편번호입력"onChange={(e)=>{
                setIsZoneCode(e.target.value)
                if (isZoneCode === ''){
                    
                }
            }} value={isZoneCode}/>
            </Form.Group>

            {/* 관심패션 */}
            <Form.Group className="mb-3">
                <Form.Label>평상시 스타일 (미선택시 관심없음으로 분류)</Form.Label>
                <Form.Select aria-label="Default select example"               onChange={(e)=>{
                    setFashion(e.target.value)
                }} value={fashion}>
                    <option value="0">관심있는 스타일을 선택해주세요</option>
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
                <Form.Control type="text"placeholder="E-mail을 입력하세요"onChange={(e)=>{
                setEmail(e.target.value)
                 var regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i
                // 형식에 맞는 경우 true 리턴
                console.log('이메일 유효성 검사 :: ', regExp.test(e.target.value))
                if (regExp.test(e.target.value) === false){
                    
                }
            }} value={email}/>
            </Form.Group>
            <Button type="submit" ref={buttonRef}>회원가입</Button>
        </Form>
        {/* </form> */}
        </>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
  
  export default SingUpModal