import React, { useCallback } from "react";
import { Modal, Button, Form, Container } from "react-bootstrap";
import {useState, useEffect, useRef} from "react";
import Test from "../components/auth/Test";
import {useForm} from "react-hook-form"
import setAuthorizationToken from "../utils/setAuthorizationToken";
import axios from "axios";
import { connect } from 'react-redux';
import {logIn} from '../redux/user/actions'




function SingInModal({show, onHide, logIn}){

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
               
                //Bearer설정 (api요청하는 콜마다 헤더에  accessToken 담아 보내도록 설정)
                setAuthorizationToken(res.data)

                // 1. refresh token은 local storage에 저장하고, access token은 cookie에 저장하라
                // 2. 요청 헤더에는 access token을 넣어라
                // 3. access token이 만료됐다고 하면, refresh token을 가져와 새로운 token을 발급받는 요청을 하여 갱신해라
                localStorage.setItem('refresh_token', res.data.refresh_token)
                localStorage.setItem('access_token', res.data.access_token)
                logIn(res.data.ID)
                
                
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

const mapDispatchToProps = (dispatch) =>{
    return {
        logIn : (data)=>{
            dispatch(logIn(data))
        }
    }
}


export default connect(mapDispatchToProps)(SingInModal)