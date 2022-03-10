import React from "react";
import { Modal,Form, Button } from "react-bootstrap";

const BeforeOrder = ({ show, onHide, orderItems, makeOrder, oneOrder })=>{


    const closeHander = ()=>{
        onHide()
      }

    const onSubmit = ()=>{
        makeOrder()
    }

    console.log(orderItems,"ttt")

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

       
        return (
            <>
            
            <div>
                 <img src={itemimg} width="auto" height="300" style={{ marginRight: "5px" , display:"inline" }} />
                 <h3> {itemname}</h3>
                 <p>가격 : {itemprice} , 주문수량 : {bcount} </p>
                 <p >총 가격 : {itemprice*bcount}</p>
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
          주문
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <>

          {render}



          <Button onClick={onSubmit}>주문하기</Button>
        </>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={closeHander}>닫기</Button>
      </Modal.Footer>
    </Modal>
    )
}

export default BeforeOrder