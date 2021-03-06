import { useEffect, useState } from "react";
import { Modal, Button, Form, Container,Nav} from "react-bootstrap";
import axios from "axios";
import Test from "../components/auth/Test";
import React from 'react';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import '../css/join.css';
import { useDispatch } from "react-redux";
import { addLoc1, addLoc2, addLoc3 } from "../redux/addr/actions";
import '../axiosproperties'

const Update= () => {
    var history=useHistory();
    const data = useLocation();
    const dispatch = useDispatch();
    // const id = localStorage.getItem('id');


    let [email, setEmail] = useState('');
    //pwd
    const [pwd, setPwd] = useState('')
    const [chkPwd, setChkPwd] = useState('')
    let [pwdMsg,setPwdMsg]=useState('');
    const [valchkPwd, setvalchkPwd] = useState(true)
    const [pwdStyle, setPwdStyle]= useState('')

    //주소 
    const [isAddress, setIsAddress] = useState('');
    const [valisAddress, setvalisAddress] = useState(false);
    const [detailAddress,setdetailAddress] = useState('')
    

    useEffect(() => {
        
        axios.post('/api/user/getUser', {
            username: sessionStorage.getItem('id'),
            password:data.state.pwd
        }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + sessionStorage.getItem('access_token'),
            },
        }).then(res => {
            
            setEmail(res.data.email);
            const location = res.data.locations[0].location.split('/');
            setdetailAddress(location.pop());
            setIsZoneCode(location.pop());
            setIsAddress(location.join(' '));
            if (res.data.locations[1]){
                const location1 = res.data.locations[1].location.split('/');
                const title = location1.pop();
                setPosttitle(title);
                setTapname(title);
                setdetailAddress1(location1.pop());
                setIsZoneCode1(location1.pop());
                setIsAddress1(location1.join(' '));
            }
            if (res.data.locations[2].location !== '///'){
                const location2 = res.data.locations[2].location.split('/');
                const title = location2.pop();
                setPosttitle1(title);
                setTapname1(title);
                setdetailAddress2(location2.pop());
                setIsZoneCode2(location2.pop());
                setIsAddress2(location2.join(' '));
            }
            

            setPwd('');
            setChkPwd('');
            // setAddpost(0);
            //아이디 상세 우편 주소 
            
            
        }).catch(error => {
            console.log(error);
        })
    }, [])
   

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

    // const onIsZoneCode = (e)=>{
    //     setIsZoneCode(e.target.value)
    //     const zip = e.target.value
    //     if (zip === true) {
    //         setvalisZoneCode(true)
    //     } else {
    //         setvalisZoneCode(false)
    //     }
    // }

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




    

    const del = async (e)=>{
        // e.preventDefault();
        await axios.delete('/api/user/delete', {
            params :{
                username: sessionStorage.getItem('id')
            }

        }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + sessionStorage.getItem('access_token'),
            },
        }).then(res => {
            alert("삭제되었습니다.")
            sessionStorage.removeItem('id');
            sessionStorage.removeItem('access_token')
            sessionStorage.removeItem('refresh_token')
            window.location.replace("/index.html")

        }).catch(error => {
            alert("비밀번호를 확인해주세요.");
        })
    };

    const delok = async ()=>{
        if(window.confirm("회원탈퇴하시겠습니까?")){
            await del();
        }else {
            alert("취소");
        }
    }
    


    const update = async (e)=>{
        e.preventDefault();
        await axios.put('/api/user/update', {
            username: sessionStorage.getItem('id'),
            locations : [
                {location:isAddress+'/'+isZoneCode+'/'+detailAddress},
                {location:isAddress1+'/'+isZoneCode1+'/'+detailAddress1+'/'+posttitle},
                {location:isAddress2+'/'+isZoneCode2+'/'+detailAddress2+'/'+posttitle1}],
            password : pwd,
            // style : fashion,
            email : email

        }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + sessionStorage.getItem('access_token'),
            },
        }).then(res => {
            alert('정보수정 성공')
            window.location.replace("/update")
            setTapname(posttitle)
            setTapname1(posttitle1)
            
        }).catch(error => {
            alert("비밀번호를 확인해주세요.");
            alert(error);

        })
    };
    
    
    //추가배송지 관련 
    let [addpost, setAddpost] = useState(0);

    //add 1
    const [isAddress1, setIsAddress1] = useState('');
    const [detailAddress1,setdetailAddress1] = useState('')
    const [isZoneCode1,setIsZoneCode1] =useState('')
    const [posttitle,setPosttitle] =useState('')
    const [tapname,setTapname] =useState('배송지 추가')

    const ondetailAddress1 =(e) => {
        setdetailAddress1(e.target.value)
        
    }
    const onposttitle =(e) => {
        setPosttitle(e.target.value)
    }
    
    
    //add 2
    const [isAddress2, setIsAddress2] = useState('');
    const [detailAddress2,setdetailAddress2] = useState('')
    const [isZoneCode2,setIsZoneCode2] =useState('')
    const [posttitle1,setPosttitle1] =useState('')
    const [tapname1,setTapname1] =useState('배송지 추가')
    
    
    const ondetailAddress2 =(e) => {
        setdetailAddress2(e.target.value)
        
    }

    const onposttitle1 =(e) => {
        setPosttitle1(e.target.value)
    }

    const sty = {top:'0.5rem'};



    return( 
        <>
        <div className="centered" style={{'paddingTop':0}}>
        <Container>
        <h1 className="centered">개인 정보 수정</h1>    
            <br />
            <Form onSubmit={update}>
                <Form.Group className="mb-3" >
                    <Form.Label>ID :</Form.Label> &nbsp;
                    <Form.Label>{sessionStorage.getItem('id')}</Form.Label>
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

                <Nav className="mt-5 mb-3" variant="tabs" defaultActiveKey="link-0">
                    <Nav.Item><Nav.Link eventKey="link-0" onClick={()=>{setAddpost(0); }}>기본 배송지</Nav.Link></Nav.Item>
                    <Nav.Item><Nav.Link eventKey="link-1" onClick={()=>{setAddpost(1); }}>{tapname}</Nav.Link></Nav.Item>
                    <Nav.Item><Nav.Link eventKey="link-2" onClick={()=>{setAddpost(2); }}>{tapname1}</Nav.Link></Nav.Item>
                </Nav>



            <Form.Group >
                {addpost === 1 && <>배송지명  <Form.Control type="text" value={posttitle} onChange={onposttitle} style={{width:"100px"}}/></>}
                {addpost === 2 && <>배송지명  <Form.Control type="text" value={posttitle1} onChange={onposttitle1} style={{width:"100px"}}/></>}
            <br></br>

            <Form.Label>우편번호</Form.Label>
            <div style={{display: 'flex'}}> 
                {addpost === 0 && <Form.Control type="text" value={isZoneCode} readOnly style={{width:"80px",textAlign:"center"}} />}
                {addpost === 1 && <Form.Control type="text" value={isZoneCode1} readOnly style={{width:"80px",textAlign:"center"}} />} 
                {addpost === 2 && <Form.Control type="text" value={isZoneCode2} readOnly style={{width:"80px",textAlign:"center"}} />}
                &nbsp; &nbsp; 
                {addpost ===0 &&<Test setIsAddress={setIsAddress}  setIsZoneCode={setIsZoneCode}  sty={1} />}
                {addpost ===1 &&<Test setIsAddress={setIsAddress1} setIsZoneCode={setIsZoneCode1} sty={2} />}
                {addpost ===2 &&<Test setIsAddress={setIsAddress2} setIsZoneCode={setIsZoneCode2} sty={2} />}
            </div>
            </Form.Group>
            <br></br>
            <Form.Group className="mb-3">
                <Form.Label>주소</Form.Label>
                {addpost ===0 &&<Form.Control type="text" placeholder="주소입력" onChange={onIsAddress} value={isAddress} readOnly />}
                {addpost ===1 &&<Form.Control type="text" placeholder="주소입력" onChange={onIsAddress} value={isAddress1} readOnly />}
                {addpost ===2 &&<Form.Control type="text" placeholder="주소입력" onChange={onIsAddress} value={isAddress2} readOnly />}
            </Form.Group>
            
            
            <Form.Group className="mb-3">
                <Form.Label>상세주소</Form.Label>
                {addpost ===0 &&<Form.Control type="text" placeholder="상세주소입력" onChange={ondetailAddress} value={detailAddress} />}
                {addpost ===1 &&<Form.Control type="text" placeholder="상세주소입력" onChange={ondetailAddress1} value={detailAddress1} />}
                {addpost ===2 &&<Form.Control type="text" placeholder="상세주소입력" onChange={ondetailAddress2} value={detailAddress2} />}
            </Form.Group>



                {valchkPwd === true ? <Button type="submit">회원수정</Button>:<Button disabled={true}>회원수정</Button>} &nbsp;
                <Button  onClick={delok}> 회원탈퇴 </Button>
               
            </Form>
        </Container>
    </div>
    </>
    )
}
export default Update;