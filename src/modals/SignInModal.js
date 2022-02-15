import React, { useCallback } from "react";
import { Modal, Button, Form, Container } from "react-bootstrap";
import {useState, useEffect, useRef} from "react";
import Test from "../components/auth/Test";
import {useForm} from "react-hook-form"
import axios from "axios";

function SingInModal({show, onHide}){
        // 로그인 
        
        const [url, setUrl] = useState();
        // 서버 사용시 보낼 url

        // 로그인 실행 함수
        const onSubmit = async (e)=>{
            e.preventDefault();            
            await axios.post('http://127.0.0.1:8080/api/login', {
                username: id,
                password:pwd
            }, {
                headers: {
                    "Content-Type": "application/json",
                  },
            }).then(res => {
                onHide();
                // console.log(res.data.access_token);
                // console.log(res.data.refresh_token);
            }).catch(error => {
                alert("아이디 혹은 비밀번호를 확인해주세요.")
            })
           
        };
        
        const [id, setID] = useState('')
        const [idMsg, setIDMsg] = useState('')
        const [valID, setvalID] = useState(false)

        const [pwd, setPwd] = useState('')
        const [pwdMsg, setpwdMsg] = useState('')
        const [valPwd, setvalPwd] = useState(false)



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
                로그인
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
                    var regExp = /^[a-z]+[a-z0-9]{3,19}$/g;
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
                    var regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{3,10}$/
                    console.log('비밀번호 유효성 검사 :: ', regExp.test(e.target.value))
                    if (regExp.test(e.target.value) === false){
                        setvalPwd(false)
                    }else{
                        setvalPwd(true)
                    }
                }} value={pwd}/>
                </Form.Group>
                <Button type="submit" >로그인</Button>
            </Form>
            {/* </form> */}
            </>
            </Modal.Body>
            {/* <Modal.Footer>
                
            </Modal.Footer> */}
            </Modal>
            );
}

export default SingInModal