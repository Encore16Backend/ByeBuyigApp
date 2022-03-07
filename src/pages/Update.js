import { useEffect, useState } from "react";
import { Modal, Button, Form, Container} from "react-bootstrap";
import axios from "axios";
import Test from "../components/auth/Test";
import React from 'react';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import '../css/join.css';

const Update= () => {
    

    var history=useHistory();
    const data = useLocation();
    // const id = localStorage.getItem('id');


    let [email, setEmail] = useState('');
    //pwd
    const [pwd, setPwd] = useState('')
    const [chkPwd, setChkPwd] = useState('')

    let [pwdMsg,setPwdMsg]=useState('');
    const [valchkPwd, setvalchkPwd] = useState(true)
    const [pwdStyle, setPwdStyle]= useState('')

    const [isAddress, setIsAddress] = useState('');
    const [valisAddress, setvalisAddress] = useState(false);

    const [fashion, setFashion] = useState('')
    const [detailAddress,setdetailAddress] = useState('')

    useEffect(() => {
        console.log("!")
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
            const location = res.data.location.split(' ');
            setdetailAddress(location.pop());
            setIsZoneCode(location.pop());
            setIsAddress(location.join(' '));
            setFashion(res.data.style);
            setPwd('')
            setChkPwd('')
            console.log(location) 
        }).catch(error => {
            console.log(error);
        })
    }, [data])
   

    //주소관련 
    const onIsAddress = (e)=>{
        setIsAddress(e.target.value)
        const Addr = e.target.value
        if (Addr === true) {
            setvalisAddress(true)
        } else {
            setvalisAddress(false)
        }
    }

    //상세주소 
    const ondetailAddress =(e) =>{
        setdetailAddress(e.target.value)
        const test =e.target.value
      }

    // 우편번호 관련  
    const [isZoneCode, setIsZoneCode] = useState('');
    const [valisZoneCode, setvalisZoneCode] = useState(false)

    const onIsZoneCode = (e)=>{
        setIsZoneCode(e.target.value)
        const zip = e.target.value
        if (zip === true) {
            setvalisZoneCode(true)
        } else {
            setvalisZoneCode(false)
        }
    }

    // 우편번호 검색으로 값이 생기면 유효성검사를 통과시키는 함수
    const OnAddr = ()=>{
        setvalisAddress(true)
        setvalisZoneCode(true) 
    }

    

    
    const onPwdChange = (e) => {
        setPwd(e.target.value);
        const firstPwd = e.target.value
        if (chkPwd ===firstPwd && firstPwd !="" ){
            setvalchkPwd(true)
            setPwdStyle('valid-input')
            setPwdMsg('※ 비밀번호 확인 성공')
        } 
        else if (firstPwd === "") {
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
        setChkPwd(e.target.value);
        const afterPwd = e.target.value;
        if (pwd ===afterPwd && afterPwd !=""){
            setvalchkPwd(true)
            setPwdStyle('valid-input')
            setPwdMsg('※ 비밀번호 확인 성공')
        } else if (afterPwd===''){
            setvalchkPwd(false)
            setPwdMsg('')
        }
        else {
            setvalchkPwd(false)
            setPwdStyle('invalid-input')
            setPwdMsg('※ 비밀번호 확인 실패')
        }
    };


    const onstlyeChange = (e) => {
        setFashion(e.target.value);
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

    const delok =(e)=>{
        
    }
    
    const update = async (e)=>{
        e.preventDefault();
        await axios.put('http://127.0.0.1:8081/api/user/update', {
            username: sessionStorage.getItem('id'),
            location : isAddress + ' ' + isZoneCode+' '+detailAddress,
            password : pwd,
            style : fashion,
            email : email

        }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + sessionStorage.getItem('access_token'),
            },
        }).then(res => {
            alert('정보수정 성공')
            window.location.replace("/update")

        }).catch(error => {
            alert("비밀번호를 확인해주세요.");
        })
    };

    return(
        <>
        <div>
        </div>
        <div className="centered" style={{'paddingTop':0}}>
        <Container>
        <h1>개인 정보 수정</h1>    
            <br />
            <Form onSubmit={update}>
                <Form.Group className="mb-3" >
                    <Form.Label>ID :</Form.Label> &nbsp;
                    <Form.Label>{localStorage.getItem('id')}</Form.Label>
                </Form.Group>
                <Form.Group className="mb-3">
                <Form.Label>E-mail :</Form.Label> &nbsp;
                <Form.Label>{email}</Form.Label>
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label>password</Form.Label>
                    <Form.Control type="password" className="password" placeholder="8자 이상 영문, 숫자 조합" minLength={8} maxLength={20}
                onChange={onPwdChange} value={pwd} />
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label>password 확인</Form.Label>
                    <Form.Control type="password" placeholder="비밀번호 확인"
                    onChange={onChekcPwdChange} value={chkPwd} />
                    {<div className={pwdStyle}>{pwdMsg}</div>}
                </Form.Group>

                <a onClick={OnAddr}>
                <Test setIsAddress={setIsAddress} setIsZoneCode={setIsZoneCode}/>
                </a>
                <br></br>

                <Form.Group className="mb-3">
                    <Form.Label>우편번호</Form.Label>
                    <Form.Control type="text" placeholder="우편번호입력" onChange={
                        onIsZoneCode
                    } value={isZoneCode} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>주소</Form.Label>
                    <Form.Control type="text" placeholder="주소입력" onChange={
                        onIsAddress
                    } value={isAddress} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>상세주소</Form.Label>
                    <Form.Control type="text" placeholder="상세주소입력" onChange={
                        ondetailAddress
                    } value={detailAddress} />
                </Form.Group>


                <Form.Group className="mb-3">
                <Form.Label>선호하는 스타일</Form.Label>
                <Form.Select aria-label="Default select example" onChange={(e) => {
                    setFashion(e.target.value)
                }} value={fashion}>
                    <option value="1">없음</option>
                    <option value="2">캐주얼</option>
                    <option value="3">미니멀</option>
                    <option value="4">스트릿</option>
                    <option value="5">시티보이</option>
                    <option value="6">아메카지</option>
                </Form.Select>
                </Form.Group>

              


                {valchkPwd == true ? <Button type="submit">회원수정</Button>:<Button disabled={true}>회원수정</Button>} &nbsp;
                <Button  onClick={delok}> 회원탈퇴 </Button>
            </Form>
        </Container>
    </div>
    </>
    )
}
export default Update;