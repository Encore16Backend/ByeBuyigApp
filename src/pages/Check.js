import { useState } from "react";
import { Modal, Button, Form} from "react-bootstrap";
import axios from "axios";
import postRefresh from "../hooks/postRefresh";
import { BrowserRouter as Router, Switch, Route,Link
} from 'react-router-dom';
import MyPage from "./MyPage";
import React from 'react';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { type } from "@testing-library/user-event/dist/type";


const Check = ()=>{

    const [pwd,setPwd] = useState('');
    const [id, setID] = useState(sessionStorage.getItem('id'));

    var history = useHistory();
    
    const onChange = (e) => {
        setPwd(e.target.value);
    };
    

    const pwdCheck = async (e)=>{
        e.preventDefault();
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
                pathname: "/update/",
                state: {
                    pwd:pwd,
                    id : res.data.username,
                    email: res.data.email,
                    location: res.data.location,
                    style: res.data.style
                }
            })   
        }).catch(error => {
            alert("비밀번호를 확인해주세요.");
        })
    };

    return(
        <>
        <div style={{textAlign:"center"}}>
            <div className="container">
                <br></br><br></br>
                <p>마이페이지</p>
                <br></br>
                <p>id : {id}</p> 
                비밀번호 : <input onChange={onChange} value={pwd}></input> 
                <button onClick={pwdCheck}>check</button>
                <br></br>
            </div>
        </div>
        </>
        
    )
}


export default Check;