import axios from "axios";
import React, { useState } from "react";
import { InputGroup, FormControl, Button, Nav } from "react-bootstrap";
import { Form } from "react-bootstrap";
import postRefresh from "../../hooks/postRefresh";
import { useSelector } from "react-redux";
import ReactStars from "react-stars"
import "../../axiosproperties"


const MakeReview = ({ lendering, setLandering, setIsReview, isReview}) =>{

    const USERID = useSelector(state => state.user.ID)
    const oneItem = useSelector(state=>state.oneItem.item)

    const imgArr = oneItem.images ? oneItem.images : []
    const temp = imgArr[0] ? imgArr[0] : [] 
    const image = temp.imgpath ? temp.imgpath : ""

    const pdtId = oneItem.itemid ? oneItem.itemid : null
    const pdtName = oneItem.itemname ? oneItem.itemname : null
    const userId = sessionStorage.getItem('id')
    const [content , setContent] = useState('')
    const [score, setScore] = useState(1)

    // 문의사항 내용
    const [inQContent, setInQContent] = useState('')
    const [inQTitle, setInQTitle] = useState('')



    const makeContent = (e)=>{
        setContent(e.target.value)
    }
    const ratingChanged = (newRating)=>{
        setScore(newRating)
    }

    // 리뷰등록함수
    const onSubmit = async (e)=>{
        e.preventDefault();
        if (userId === null || userId === ""){
            alert("로그인 후에 작성 할 수 있습니다")
            return
        }else if (content === ""){
            alert("내용을 입력하세요")
            return
        }
        await axios.post('/review/save',{
                // body
                itemid: pdtId,
                itemname : pdtName,
                itemimage : image,
                username : userId,
                content: content,
                score : parseFloat(score)
        },{
            // header
            headers:{
                "Content-Type": "application/json",
                "Authorization": "Bearer " + sessionStorage.getItem('access_token')
            }
        }).then(res =>{
            setContent('');
            setScore(1);
            setLandering(!lendering)
            alert('댓글 등록 완료')
        }).catch(error =>{
            console.log(error);
        })
    }

    // 문의사항 작성
    const inquirySave = async (e) =>{
        e.preventDefault()
        
        if (userId === null || userId === ""){
            alert("로그인 후에 작성 할 수 있습니다")
            return
        }else if (inQTitle === ""){
            alert("제목을 입력하세요")
            return
        }else if (inQContent === ""){
            alert("내용을 입력하세요")
            return
        }
        await axios.post('/inquiry/save',{
                // 답변여부, 날짜, 답변 빼고 보냄
                username : userId,
                itemid : pdtId,
                itemname : pdtName,
                itemimage : image,
                title : inQTitle,
                content : inQContent
        },{
            // header
            headers:{
                "Content-Type": "application/json",
                "Authorization": "Bearer " + sessionStorage.getItem('access_token')
            }
        }).then(res =>{
            setLandering(!lendering)
            setInQTitle("")
            setInQContent('')
            alert('문의 사항 등록 완료')
        }).catch(error =>{
            console.log(error);
            // postRefresh() // 토큰이 없으면 재발행시키는 함수
            // inquirySave(e)
        })
    }


    return(

        <div className="reviewMakeForm">
            {/* 리뷰 문의사항 토글 버튼 */}
        <Nav className="mt-5 mb-3" variant="tabs" defaultActiveKey="link-0">
                <Nav.Item><Nav.Link eventKey="link-0" onClick={()=>{setIsReview(true); }}>후기</Nav.Link></Nav.Item>
                <Nav.Item><Nav.Link eventKey="link-1" onClick={()=>{setIsReview(false); }}>문의사항</Nav.Link></Nav.Item>
        </Nav>

        {
            isReview ?  <Form onSubmit={onSubmit}>
                            {/* <div className="reviewMakeFormStar"> 
                                <ReactStars id="reviewMakeFormStarID" count={5} onChange={ratingChanged} size={30} color2={'#ffd700'} value={score}  />
                            </div>
                            <InputGroup>
                                <FormControl as="textarea" aria-label="With textarea" onChange={makeContent} value={content} />
                                <Button type="submit">후기작성</Button>
                            </InputGroup> */}
                        </Form> : <Form onSubmit={inquirySave}>
                 <Form.Group>
                    <Form.Label>문의사항 제목</Form.Label>
                    <Form.Control placeholder="제목을 입력하세요" onChange={(e)=>setInQTitle(e.target.value)} value={inQTitle} />
                    <br />
                    <Form.Label>문의사항 내용</Form.Label>
                    <Form.Control placeholder="내용을 입력하세요"  as="textarea" aria-label="With textarea" onChange={(e)=>setInQContent(e.target.value)} value={inQContent} />    
                    <br />
                    <Button type="submit">문의사항 작성</Button>
                </Form.Group>
                </Form> 
        }
        </div>
    )
}

export default MakeReview