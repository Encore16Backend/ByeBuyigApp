import React from 'react'
import {Modal, Form, Button} from 'react-bootstrap'
import { useState } from 'react'
import ReactStars from "react-stars"
import '../axiosproperties'

const MakeReviewModal = ({ show, onHide, saveReview, itemid, itemimg,itemname, orderid })=>{

    // 리뷰 등록할 내용과 별점
    const [content , setContent] = useState('')
    const [score, setScore] = useState(1)

  const makeContent = (e)=>{
      setContent(e.target.value)
  }
  const ratingChanged = (newRating)=>{
      setScore(newRating)
  }

    const closeHander = ()=>{
        onHide()
    }


    return(
        <>
        <Modal show={show} onHide={closeHander} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          리뷰등록
        </Modal.Title>
      </Modal.Header>
      <Modal.Body >
        <div>
            <Form.Group style={{display: "grid"}}> 
                  
                  <div className="reviewMakeFormStar"> 
                      <ReactStars id="reviewMakeFormStarID" count={5} onChange={ratingChanged} size={30} color2={'#ffd700'} value={score}  />
                  </div>
                  <br/>
                  
                  <div style={{ display: 'flex' }}>
                    <Form.Control type="text" value={content} onChange={makeContent}   />
                  </div>
            </Form.Group>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={()=>{
            saveReview(itemid,itemname,itemimg, content, score, orderid)
            onHide()
        }}>리뷰등록</Button>  
        <Button onClick={closeHander}>닫기</Button>
      </Modal.Footer>
    </Modal>
        </>
    )
}

export default MakeReviewModal