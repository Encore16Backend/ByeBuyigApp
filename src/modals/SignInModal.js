import React, { useCallback } from "react";
import { Modal, Button, Form, Container } from "react-bootstrap";
import {useState, useEffect, useRef} from "react";
import Test from "../components/auth/Test";
import {useForm} from "react-hook-form"
import axios from "axios";
// import Cookies from "universal-cookie/es6";

function SingInModal({show, onHide}){

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
                // console.log(res.data.refresh_token); 최초로그인 시 발급
            }).catch(error => {
                alert("아이디 혹은 비밀번호를 확인해주세요.")
            })
        };
        
        const [id, setID] = useState('')
        const [pwd, setPwd] = useState('')

        // 모달창 닫을때 state초기화까지 해주는 함수
        const closeHander = ()=>{
            setID('')
            setPwd('')
            onHide()
        }


        return (
            <Modal
            show = {show}
            onHide = {closeHander}
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
                    <Form.Control type="text" className="ID" placeholder="영문자로 시작하는 영문자 또는 숫자 6~20자" onChange={(e)=>{setID(e.target.value)}}
                     value={id}/>
                </Form.Group>

                    {/* PWD */}
                <Form.Group className="mb-3" >
                    <Form.Label>password</Form.Label>
                    <Form.Control type="password" placeholder="8 ~ 10자 영문, 숫자 조합" className="password" onChange={(e)=>{setPwd(e.target.value)}} value={pwd}/>
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