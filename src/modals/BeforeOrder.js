import React from "react";
import { Modal,Form, Button, Nav } from "react-bootstrap";
import { useState } from "react";
import Test from "../components/auth/Test";
import { useEffect } from "react";
import axios from "axios";
import cookie from 'react-cookies'
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import '../axiosproperties'


const BeforeOrder = ({ show, onHide, orderItems, makeOrder })=>{

      const history = useHistory();

// 배송지 받아오는 함수
      useEffect(() => {
        axios.post('/api/user/getUser', {
            username: sessionStorage.getItem('id'),
            password:cookie.load('pwd')
        }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + sessionStorage.getItem('access_token'),
            },
        }).then(res => {
            console.log(res.data)
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
        }).catch(error => {
            console.log(error);
        })
    }, [])

    // 가격의 총 합을 적을 변수
    let sum = 0

    const closeHander = ()=>{
        onHide()
      }


    // 0 : 기본 , 1 : 다른곳 , 2 : 또 다른곳
    let [addpost, setAddpost] = useState(0);
    
    const onSubmit = ()=>{
        makeOrder(addpost)
        // 배송지명 우편번호 주소 상세주소
        if (addpost === 0){
          sessionStorage.setItem('addrNameBasic', "기본배송지")
          sessionStorage.setItem('isZoneCodeBasic', isZoneCode)
          sessionStorage.setItem('isAddressBasic', isAddress)
          sessionStorage.setItem('detailAddressBasic', detailAddress)
        }else if (addpost === 1){
          sessionStorage.setItem('addrName1', posttitle)
          sessionStorage.setItem('isZoneCode1', isZoneCode1)
          sessionStorage.setItem('isAddress1', isAddress1)
          sessionStorage.setItem('detailAddress1', detailAddress1)
        }else{
          sessionStorage.setItem('addrName2', posttitle1)
          sessionStorage.setItem('isZoneCode2', isZoneCode2)
          sessionStorage.setItem('isAddress2', isAddress2)
          sessionStorage.setItem('detailAddress2', detailAddress2)
        }
    }

    const addr1 = localStorage.getItem("loc1")
    const addr2 = localStorage.getItem("loc2")
    const addr3 = localStorage.getItem("loc3")

    // basic
    const [isZoneCode, setIsZoneCode] = useState('');
    const [isAddress, setIsAddress] = useState('');
    const [valisAddress, setvalisAddress] = useState(false);
    const [detailAddress,setdetailAddress] = useState('')
    const [fashion, setFashion] = useState('')
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

    
    //add 1
    const [isAddress1, setIsAddress1] = useState('');
    const [detailAddress1,setdetailAddress1] = useState('')
    const [isZoneCode1,setIsZoneCode1] =useState('')
    const [posttitle,setPosttitle] =useState('')
    const [tapname,setTapname] =useState('배송지 추가')

    const ondetailAddress1 =(e) => {
        setdetailAddress1(e.target.value)
        console.log(e.target.value)
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
      console.log(e.target.value)
    }

    const onposttitle1 =(e) => {
        setPosttitle1(e.target.value)
    }



    // 아이템들 렌더링 시키는 함수
    const render = orderItems.map((data,idx)=>{
        let bcount = data.bcount
        let id = data.id
        let itemid = data.itemid
        let itemimg = data.itemimg
        let itemname = data.itemname
        let itemprice = data.itemprice
        // bcount: 3
        // id: 47
        // itemid: 365
        // itemimg: "./상품이미지/상의/반팔/S t Bear Tee Black1.jpg"
        // itemname: "S t Bear Tee Black"
        // itemprice: 21000
        // username: "qwerqwer"

        sum += itemprice*bcount

       
        return (
            <>
            <div style={{display:"inline-block"}} >
                 <img src={itemimg} width="140px" height="140px" style={{ marginRight: "5px" , display:"inline" }} />
                 <div style={{display:"inline-block", paddingLeft:"1rem", verticalAlign:"top"}}>
                 <p> <b>{itemname}</b></p>
                 <p>가격 : {itemprice} 주문수량 : {bcount} </p>
                 <p >주문 가격 : {itemprice*bcount}</p>
                 </div>
            </div>
            <hr/>
            </>
        )
    })



    return(
    <Modal
      show={show}
      onHide={closeHander}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          주문확인
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <>
          {render}
          

          {/* 배송지 선택 버튼 */}
          <Nav className="mt-5 mb-3" variant="tabs" defaultActiveKey="link-0">
                    <Nav.Item><Nav.Link eventKey="link-0" onClick={()=>{setAddpost(0); }}>기본 배송지</Nav.Link></Nav.Item>
                    <Nav.Item><Nav.Link eventKey="link-1" onClick={()=>{setAddpost(1); }}>{tapname}</Nav.Link></Nav.Item>
                    <Nav.Item><Nav.Link eventKey="link-2" onClick={()=>{setAddpost(2); }}>{tapname1}</Nav.Link></Nav.Item>
                </Nav>
          {/* 배송지 관련 */}
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
                {addpost ===0 &&<Test setIsAddress={setIsAddress} setIsZoneCode={setIsZoneCode}/>}
                {addpost ===1 &&<Test setIsAddress={setIsAddress1} setIsZoneCode={setIsZoneCode1}/>}
                {addpost ===2 &&<Test setIsAddress={setIsAddress2} setIsZoneCode={setIsZoneCode2}/>}
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
            <Button onClick={onSubmit}>주문하기</Button>   <span style={{paddingLeft:"31.5rem"}}><b>총 결제금액</b> : {sum} </span>
        </>
      </Modal.Body>
      <Modal.Footer>
        
        <Button onClick={closeHander}>닫기</Button>
      </Modal.Footer>
    </Modal>
    )
}

export default BeforeOrder