import { useEffect, useState } from "react";
import { Modal, Button, Form} from "react-bootstrap";
import axios from "axios";
import postRefresh from "../hooks/postRefresh";
import { BrowserRouter as Router, Switch, Route,Link
} from 'react-router-dom';
import MyPage from "./MyPage";
import React from 'react';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import '../css/join.css';

const Update= () => {
    

    var history=useHistory();

    const data = useLocation();
    // const id = localStorage.getItem('id');


    let [email, setEmail] = useState('');
    let [style, setStyle] = useState('');
    //pwd
    let [pwd, setPwd] = useState('');
    let [checkpwd, setCheckPwd] = useState('');
    let [pwdMsg,setPwdMsg]=useState('');
    const [valchkPwd, setvalchkPwd] = useState(true) 
    const [pwdStyle, setPwdStyle]= useState('')

    //location
    let [location, setLocation] = useState('');


    useEffect(() => {
        axios.post('http://127.0.0.1:8081/api/user/getUser', {
            username: sessionStorage.getItem('id'),
            password:data.state.pwd
        }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + sessionStorage.getItem('access_token'),
            },
        }).then(res => {
            setEmail(res.data.email);
            setLocation(res.data.location);
            setStyle(res.data.style);
            setPwd('')
            setCheckPwd('')
            // history.push({
            //     pathname: "/update/",
            //     state: {
            //         pwd:pwd
            //         // id : res.data.username,
            //         // email: res.data.email,
            //         // location: res.data.location,
            //         // style: res.data.style
            //     }
            // })   
        }).catch(error => {
            history.push("/")
        })
    }, [])
   

    const onLoctionChange = (e) => {
        setLocation(e.target.value);
    };

    
    const onPwdChange = (e) => {
        setPwd(e.target.value);
        const firstPwd = e.target.value
        if (checkpwd ===firstPwd && firstPwd !="" ){
            setvalchkPwd(true)
            setPwdStyle('valid-input')
            setPwdMsg('※ 비밀번호 확인 성공')
        } 
        else if (firstPwd ==="") {
            setvalchkPwd(true)
            setPwdMsg('')
        }
        else {
            setvalchkPwd(false)
            setPwdStyle('invalid-input')
            setPwdMsg('※ 비밀번호 확인 실패')
        }
    };


    const onChekcPwdChange = (e) => {
        setCheckPwd(e.target.value);
        const afterPwd = e.target.value;
        if (pwd ===afterPwd && afterPwd !=""){
            setvalchkPwd(true)
            setPwdStyle('valid-input')
            setPwdMsg('※ 비밀번호 확인 성공')
        } else if (afterPwd===''){
            setPwdMsg('')
        }
        else {
            setvalchkPwd(false)
            setPwdStyle('invalid-input')
            setPwdMsg('※ 비밀번호 확인 실패')
        }
    };


    const onstlyeChange = (e) => {
        setStyle(e.target.value);
    };

    

    const del = async (e)=>{
        e.preventDefault();
        await axios.delete('http://127.0.0.1:8081/api/user/delete', {
            params :{
                username: sessionStorage.getItem('id')
            }

        }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem('access_token'),
            },
        }).then(res => {
            alert('삭제성공')
            sessionStorage.removeItem('id');
            sessionStorage.removeItem('access_token')
            sessionStorage.removeItem('refresh_token')
            window.location.replace("/")

        }).catch(error => {
            alert("비밀번호를 확인해주세요.");
        })
    };


    const update = async (e)=>{
        e.preventDefault();
        await axios.put('http://127.0.0.1:8081/api/user/update', {
            username: sessionStorage.getItem('id'),
            location : location,
            password : pwd,
            style : style,
            email : email

        }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + sessionStorage.getItem('access_token'),
            },
        }).then(res => {
            alert('정보수정 성공')
            window.location.replace("/")

        }).catch(error => {
            alert("비밀번호를 확인해주세요.");
        })
    };

    

    return(
        <>
        <div style={{position:"relative",textAlign:"center" /*,background:"gray",margin:"100px"*/}}>
            <br></br><br></br>
            ID <br></br> {localStorage.getItem('id')} <br></br><br></br>
            E-mail <br></br> {email} <br></br><br></br>
            PASSOWRD <br></br> <input onChange={onPwdChange} value={pwd} type="password"></input> <br></br><br></br>
            PASSOWRD 확인 <br></br> <input onChange={onChekcPwdChange} value={checkpwd} type="password"></input> <br></br>
            {<div className={pwdStyle}>{pwdMsg}</div>} <br></br>
            ADDRESS <br></br><input onChange={onLoctionChange} value={location}></input> <br></br><br></br>
            선호하는 스타일 <br></br> <input onChange={onstlyeChange} value={style}></input> <br></br><br></br>
            {valchkPwd == true ? <Button onClick={update}>정보 수정</Button> : <Button disabled={true}>정보 수정</Button>}&nbsp; &nbsp;
            <Button onClick={del}>회원 탈퇴</Button>
            <br></br><br></br>
        </div>
        </>
    )
}
export default Update;
