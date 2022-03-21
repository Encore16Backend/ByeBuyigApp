import { useState } from "react";
import { Modal, Button, Form,Nav} from "react-bootstrap";
import axios from "axios";
import React from 'react';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { BrowserRouter as Router, Switch, Route,Link, NavLink
} from 'react-router-dom';
import '../axiosproperties'

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
        await axios.post('/api/user/getUser', {
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
                    axios.get('/api/token/refresh', {
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
            <p style={{color:"black", position:"relative", top:"13px", left:"13px", paddingTop:"14px",paddingBottom:"5px", cursor: "pointer"}} onClick={handleShow}>개인정보수정  </p>
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