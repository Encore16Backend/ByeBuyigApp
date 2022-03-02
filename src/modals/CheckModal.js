import { useState } from "react";
import { Modal, Button, Form,Nav} from "react-bootstrap";
import axios from "axios";
import postRefresh from "../hooks/postRefresh";
import { BrowserRouter as Router, Switch, Route,Link
} from 'react-router-dom';
import React from 'react';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { type } from "@testing-library/user-event/dist/type";


function CheckModal (){

    const [pwd,setPwd] = useState('');
    const [id, setID] = useState(sessionStorage.getItem('id'));
    const [show, setShow] = useState(false);

    const handleClose = ()=> {
        setShow(false);
        setPwd('')
    };

    const handleShow = ()=> setShow(true);

    var history = useHistory();

    const onChange = (e) => {
        setPwd(e.target.value);
    };

    const pressEnter = (e)=>{
        if(e.key==='Enter'){
            pwdCheck();
        }
    }

    const pwdCheck = async (e)=>{
        //e.preventDefault();
        await axios.post('http://127.0.0.1:8081/api/user/getUser', {
            username: id,
            password:pwd
        }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + sessionStorage.getItem('access_token'),
            },
        }).then(res => {
            history.push({
                pathname: "/update",
                state: {
                    pwd:pwd,
                    id : res.data.username,
                    email: res.data.email,
                    location: res.data.location,
                    style: res.data.style
                }
            })
            handleClose();
        }).catch(error => {
            if (error.response.status === 403) {
                const { data } = error.response;
                if (data['error_message'].indexOf("The Token has expired") != -1) {
                    axios.get('http://127.0.0.1:8081/api/token/refresh', {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": "Bearer " + sessionStorage.getItem('refresh_token'),
                        }
                    }).then(res => {
                        sessionStorage.setItem('access_token', res.data.access_token);
                        pwdCheck();
                    })
                }
            }
            else {
                alert("비밀번호를 확인해주세요.");
            }  
        })
    };

    return(
        <>
        
          <div>
            <Nav.Link onClick={handleShow}>개인정보수정</Nav.Link>
                <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>비밀번호 확인</Modal.Title>
                </Modal.Header>

                <Modal.Body>PASSWORD <br></br><br></br>
                <input onChange={onChange} value={pwd} type="password" onKeyPress={pressEnter}></input>
                </Modal.Body>

                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={pwdCheck}>
                    Check
                </Button>
                </Modal.Footer>
                </Modal>
            </div>
        </>
        
    )
    }

export default CheckModal;