import React, { useCallback } from "react";
import { Modal, Button, Form, Container } from "react-bootstrap";
import {useState, useEffect, useRef} from "react";
import axios from "axios";
import { connect } from 'react-redux';
import {logIn} from '../redux/user/actions'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import cookie from 'react-cookies'
import '../axiosproperties'

function SingInModal({show, onHide, logIn}){
        var history = useHistory();
        
        // 로그인 실행 함수
        const onSubmit = async (e)=>{
            e.preventDefault();            
            await axios.post('/api/login', {
                username: id,
                password:pwd
            }, {
                headers: {
                    "Content-Type": "application/json",
                  },
            }).then(res => {
                // sessionStorage.setItem('refresh_token', res.data.refresh_token)
                sessionStorage.setItem('access_token', res.data.access_token) 
                cookie.save('pwd', pwd,{
                    path:"/",
                })
                cookie.save('refreshCookie',res.data.refresh_token,{
                    path:"/",
                })
                closeHander();
            }).then(res =>{
                logIn(id)
                localStorage.setItem('id', id)
                sessionStorage.setItem('id', id)

                
                //겟ㅇ저
                axios.post('/api/user/getUser', {
                    username: sessionStorage.getItem('id'),
                    password:pwd
                }, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + sessionStorage.getItem('access_token'),
                    },
                }).then(res => {
                    sessionStorage.setItem("roles",res.data.roles[0].name)
                }).catch(error =>{
                    // 권한 문제인것같다 - getuser 에서 어드민권한이 다른듯?
                    sessionStorage.setItem("roles","ROLE_ADMIN")
                })

                window.location.replace("/")
                
            }).catch(error => {
                alert("아이디 혹은 비밀번호를 확인해주세요.")
            })
        };

        // 로그인 직후 getUser호출



        // getUser의 res에서 role을 찾아 세션에 저장
        
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

export default connect(null,mapDispatchToProps)(SingInModal)