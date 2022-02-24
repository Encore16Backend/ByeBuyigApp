import React from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import postRefresh from "../../hooks/postRefresh";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { FormControl } from "react-bootstrap";
import ReactPaginate from "react-paginate"
import { Button, Form, InputGroup } from "react-bootstrap";


const ReviewView = ({ lendering, setLandering, setPage, setDesc, setDate })=>{

    const [content , setContent] = useState('')
    const [score, setScore] = useState(0)
    // 댓글 수정시 값
    const makeContent = (e)=>{
        setContent(e.target.value)
    }
    const makeScore = (e)=>{
        setScore(e.target.value)
    }

    // 페이지 변경함수
    const handlePageChange = (e)=>{
        setPage(e.selected+1)
    }

    // 리뷰배열과 아이디
    const reviews = useSelector(state => state.reviews.reviews)
    const userID = sessionStorage.getItem('id')

    // 수정폼 나오게한다
    const modify = (id)=>{
        let form = document.querySelector('#modify'+id);
        if (form.style['display'] === 'none')
            form.style['display'] = 'block'
        else
            form.style['display'] = 'none'
    }

    // 리뷰수정
    const modifyReview = async (reviewid,score,content)=>{
            await axios.put('http://127.0.0.1:8081/review/update',{
                    // body
                    id : reviewid,
                    content: content,
                    score : parseFloat(score)
            },{
                // header
                headers:{
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + sessionStorage.getItem('access_token')
                }
            }).then(res =>{
                console.log(res, "res")
                setLandering(!lendering)
                modify(reviewid)
                alert('댓글 수정 완료')
            }).catch(error =>{
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
                postRefresh() // 토큰이 없으면 재발행시키는 함수
                modifyReview(reviewid,score,content) //  토큰을 받고 실행하고 싶은 함수 다시 실행
            })
    }

    // 리뷰삭제 안댐
    const delReview = async (id)=>{
        await axios.delete('http://127.0.0.1:8081/review/delete',{
                id:id
        },{
            headers:{
                "Content-Type": "application/json",
                "Authorization": "Bearer " + sessionStorage.getItem('access_token')
            }
        }).then(res =>{
            console.log(res, "res")
            setLandering(!lendering)
            alert('댓글 삭제 완료')
        }).catch(error =>{
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            // postRefresh() // 토큰이 없으면 재발행시키는 함수
            // delReview(id) //  토큰을 받고 실행하고 싶은 함수 다시 실행
        })
    }

    const orderbyASC = ()=>{
        // 오름차순
        setDesc("ASC")

    }
    const orderbyDESC = ()=>{
        // 내림차순
        setDesc("DESC")
        
    }

    {/* 댓글들 받아와서 반복문 돌림*/}
    const render = reviews.map((review,index)  =>{
        // makeContent(review.content)
        return(
            
            <div key={"review"+review.id} id={review.id}>
                    <div key={'reviewcontent'+review.id}>{review.username} / 점수 : {review.score} / 등록날짜 : {review.date} 
                        <div className="reviewDelChange" key={'reviewdelchange'+review.id}>
                        {
                            (userID === review.username) ? <span key={'modifyText'+review.id} onClick={()=>{modify(review.id)} }>수정 /</span> : ""
                        }
                        {
                            (userID === review.username) ? <span key={'delText'+review.id} onClick={()=>{delReview(review.id)}}>삭제</span> : ""
                        }
                        </div>
                    </div>
                    <div key={'reviewcontend'+review.id}>{review.content}</div>
                    {/* 댓글 수정폼 부분 */}
                        <div key={'modify'+review.id} id={'modify'+review.id} style={{display:"none"}}>
                            <InputGroup key={'InputGroup'+review.id}>
                            <FormControl key={'FormControl'+review.id} as="textarea" aria-label="With textarea" onChange={makeContent} value={content}  />
                            <Form.Select key={'FormSelect'+review.id} aria-label="Default select example" onChange={makeScore} value={score} >
                            <option value="1" key={'option1'+review.id}>1</option>
                            <option value="2" key={'option2'+review.id}>2</option>
                            <option value="3" key={'option3'+review.id}>3</option>
                            <option value="4" key={'option4'+review.id}>4</option>
                            <option value="5" key={'option5'+review.id}>5</option>
                            </Form.Select >
                            <Button type="submit" key={'button'+review.id} onClick={()=>{modifyReview(review.id, score, content )}}>리뷰 수정</Button>
                            </InputGroup>
                        </div> 
                    <br/>
            </div>
             
        )
    })

    return(
        <div className="reviews">
            <div>
                <p> <span onClick={orderbyASC}>오름차순</span> <span onClick={orderbyDESC}>내림차순</span> </p>
            </div>
           {render}
           <div className="myPage centered">
             <ReactPaginate 
                  pageCount={Math.ceil(65 / 10)}
                  pageRangeDisplayed={2}
                  marginPagesDisplayed={0}
                  breakLabel={""}
                  previousLabel={"이전"}
                  nextLabel={"다음"}
                  onPageChange={handlePageChange}
                  containerClassName={"pagination-ul"}
                  activeClassName={"currentPage"}
                  previousClassName={"pageLabel-btn"}
                  nextClassName={"pageLabel-btn"}
             />
             </div>
        </div>
    )
}

export default ReviewView