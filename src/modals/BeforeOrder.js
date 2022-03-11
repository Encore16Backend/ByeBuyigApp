import React from "react";
import { Modal,Form, Button } from "react-bootstrap";

const BeforeOrder = ({ show, onHide, orderItems, makeOrder })=>{

    let sum = 0

    const closeHander = ()=>{
        onHide()
      }

    const onSubmit = ()=>{
        makeOrder()
    }

    console.log(orderItems,"모달창에 들어온 items")

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
          <Button onClick={onSubmit}>주문하기</Button> 
          <span style={{paddingLeft:"31.5rem"}}><b>총 결제금액</b> : {sum} </span>
        </>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={closeHander}>닫기</Button>
      </Modal.Footer>
    </Modal>
    )
}

export default BeforeOrder