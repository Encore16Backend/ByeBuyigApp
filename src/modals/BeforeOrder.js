import React from "react";
import { Modal,Form, Button } from "react-bootstrap";

const BeforeOrder = ({ show, onHide, orderItems, makeOrder })=>{


// [{…}]
// 0: {id: 47, username: 'qwerqwer', bcount: 3, itemid: 365, itemimg: './상품이미지/상의/반팔/S t Bear Tee Black1.jpg', …}
// length: 1


// [{…}]0: {username: 'qwerqwer', bcount: 3, itemid: 184, itemimg: './상품이미지/바지/슬랙스/우먼즈 플루이드 슬림 스트레이트 슬랙스 블랙1.jpg', itemname: '우먼즈 플루이드 슬림 스트레이트 슬랙스 블랙', …}length: 1[[Prototype]]: Array(0) '모달창에 들어온 items'
    // 이게 정답


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