import React from "react";
import { Modal,Form, Button, Nav } from "react-bootstrap";
import { useState } from "react";
import Test from "../components/auth/Test";
import { useEffect } from "react";
import axios from "axios";
import cookie from 'react-cookies'
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import '../axiosproperties'
import { defaultEqualityCheck } from "reselect";
import {getStringPrice} from "../axiosproperties";


const BeforeOrder = ({ show, onHide, orderItems, makeOrder })=>{

      const history = useHistory();
      let [locations, setLocation] = useState([]);
      let [locName, setLocName] = useState([]);

      // 배송지 받아오는 함수
      async function getUserinfo() {
        await axios.get('/api/user/getinfo', {
          params:{
            username: sessionStorage.getItem('id'),
          },
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + sessionStorage.getItem('access_token'),
          }
        }).then(res => {
            let data = res.data;
            let locname = [];
            for (var i=0; i<res.data.length; i++){
              
              data[i] = data[i].location.split('/');
              if (data[i][3] != undefined){
                locname.push(data[i][3]);
              }else{
                locname.push("새 배송지");
              }
              
            }
            setLocName(locname);
            setLocation(data);
        }).catch(error => {
            console.log(error);
        })
      }

    // 가격의 총 합을 적을 변수
    let sum = 0

    const closeHander = ()=>{
        onHide()
      }

    // 0 : 기본 , 1 : 다른곳 , 2 : 또 다른곳
    let [addpost, setAddpost] = useState(0);
    
    const onSubmit = ()=>{
      // 배송지명 우편번호 주소 상세주소
      // {address.name} {address.zonecode} {address.addr} {address.detail}
      if(addpost === 0){
        locName[addpost]='';
      } 
      const sendLocation = locName[addpost]+' '+locations[addpost][1]+' '
            +locations[addpost][0]+' '+locations[addpost][2];
      makeOrder(sendLocation);
    }

    // 배송지명
    const onposttitle =(e) => {
      setLocName({
        ...locName,
        [addpost]:e.target.value
      })
    }

    const onAllAddr = (target1, target2)=>{
      const temp = [...locations];
      temp[addpost][0] = target1;
      temp[addpost][1] = target2;
      setLocation(temp)
    }

    const ondetailAddress = (e) =>{
      const temp = [...locations];
      temp[addpost][2] = e.target.value;
      setLocation(temp)
    }



    // 아이템들 렌더링 시키는 함수
    const render = orderItems.map((data,idx)=>{
        let bcount = data.bcount
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
                 <img src={`https://byebuying.s3.ap-northeast-2.amazonaws.com/`+itemimg} width="140px" height="140px" style={{ marginRight: "5px" , display:"inline" }} />
                 <div style={{display:"inline-block", paddingLeft:"1rem", verticalAlign:"top"}}>
                 <p> <b>{itemname}</b></p>
                 <p>가격 : {getStringPrice(itemprice)} </p>
                 <p>주문수량 : {bcount} </p>
                 <p >주문 가격 : {getStringPrice(itemprice*bcount)}</p>
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
          
          {
            locations[0] === undefined ? getUserinfo() :
            (
              <>
                <>
                <Nav className="mt-5 mb-3" variant="tabs" defaultActiveKey="link-0">
                  <Nav.Item><Nav.Link eventKey="link-0" onClick={() => { setAddpost(0); } }>기본 배송지</Nav.Link></Nav.Item>
                  <Nav.Item><Nav.Link eventKey="link-1" onClick={() => { setAddpost(1); } }>{ locations[1] === undefined ? "" : locations[1][3]  }</Nav.Link></Nav.Item>
                  <Nav.Item><Nav.Link eventKey="link-2" onClick={() => { setAddpost(2); } }>{ locations[2] === undefined ? "" : locations[2][3]}</Nav.Link></Nav.Item>
                </Nav>
                </>
                <>
                <Form.Group> 
                  {addpost === 1 || addpost === 2 ?
                    <>
                      배송지명  <Form.Control type="text" onChange={onposttitle} value={locName[addpost]} style={{ width: "100px" }} /> {/*   */}
                    </> : ''}
                  <Form.Label>우편번호</Form.Label>
                  <div style={{ display: 'flex' }}>
                    <Form.Control type="text" value={locations[addpost][1]} readOnly style={{ width: "80px", textAlign: "center" }} />
                    &nbsp; &nbsp;
                    <Test  onAllAddr={onAllAddr}/>
                  </div>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>주소</Form.Label>
                  <Form.Control type="text" placeholder="주소입력" value={locations[addpost][0]} readOnly />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>상세주소</Form.Label>
                  <Form.Control type="text" placeholder="상세주소입력" onChange={ondetailAddress} value={locations[addpost][2]} /> {/*  */}
                </Form.Group>
                </>
              </> 
            )
          }
            <Button onClick={onSubmit}>주문하기</Button>   <span style={{paddingLeft:"31.5rem"}}><b>총 결제금액</b> : {getStringPrice(sum)} </span>
        </>
      </Modal.Body>
      <Modal.Footer>
        
        <Button onClick={closeHander}>닫기</Button>
      </Modal.Footer>
    </Modal>
    )
}

export default BeforeOrder