import React from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import postRefresh from "../../hooks/postRefresh";
import { useState } from "react";
import { FormControl } from "react-bootstrap";
import ReactPaginate from "react-paginate"
import { Button, InputGroup } from "react-bootstrap";
import ReactStars from "react-stars"
import Page from "../Base/main/Page";

const ReviewView = ({ lendering, page ,setLandering, setPage, setDesc, setDate, pdtState })=>{

    // 해당 item을 받아옴
    const allItem = useSelector(state => state.Item.items)
    const rendered = allItem.filter(item => item.itemid === pdtState.itemid)
    const renderedItem = rendered[0]
    let allReviewNums = 0
    if (renderedItem){  
        allReviewNums = renderedItem.reviewcount
    }

    // 댓글의 점수와 내용
    const [content , setContent] = useState('')
    const [score, setScore] = useState(1)
    const [dateMsg, setDateMsg] = useState("최근 댓글")
    const [reviewMsg, setReviewMsg] = useState("높은 별점 순")
    // 댓글 수정시 값
    const makeContent = (e)=>{
        setContent(e.target.value)
    }
    // 페이지 변경함수
    const handlePageChange = (e)=>{
        setPage(e.selected+1)
    }
    const handlePage = (data)=>{
        setPage(data)
    }
    // 리뷰배열과 아이디
    const reviews = useSelector(state => state.reviews.reviews)
    const userID = sessionStorage.getItem('id')
    // 수정폼 나오게한다
    const modify = (id,content,score)=>{
        let form = document.querySelector('#modify'+id);
        if (form.style['display'] === 'none'){
            setContent(content)
            setScore(score)
            form.style['display'] = 'block'
        }
        else {
            form.style['display'] = 'none'
        }
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
    const delReview = async (id, itemname)=>{
        alert(id+"/"+itemname)
        await axios.delete('http://127.0.0.1:8081/review/delete',{
                params:{
                    id:id,
                    itemname:itemname
                }
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
            postRefresh() // 토큰이 없으면 재발행시키는 함수
            delReview(id) //  토큰을 받고 실행하고 싶은 함수 다시 실행
        })
    }
    // 별점점수 바꾸는 함수
    const ratingChanged = (newRating)=>{
        setScore(newRating)
    }

    // 리뷰 정렬값들을 받을 state
    const [conditionSelect,setConditionSelect ] = useState('date')
    const [sortSelect, setSortSelect] = useState('desc')
    const makeCondition = (e)=>{
        setConditionSelect(e.target.value)
        if (e.target.value === "date"){
            setDate('date')
            setPage(1)
        }else if (e.target.value === "score"){
            setDate('score')
            setPage(1)
        }
    }
    const makeSort = (e)=>{
        alert(e.target.value)
        setSortSelect(e.target.value)
        if (e.target.value === "DESC"){
            setDesc("DESC")
            setPage(1)
        }else if (e.target.value === "ASC"){
            setDesc("ASC")
            setPage(1)
        }
    }
    // 문자열로 정렬할떄 함수
    const orderReview = (e)=>{
        if (reviewMsg === "높은 별점 순"){
            setReviewMsg("낮은 별점 순")
            setDate("score")
            setPage(1)
            setDesc("DESC")

        }else{
            setReviewMsg("높은 별점 순")
            setDate("score")
            setPage(1)
            setDesc("ASC")
        }
    }
    const orderDate = (e)=>{
        if (dateMsg === "최근 댓글"){
            setDateMsg("오래된 댓글")
            setDate("date")
            setPage(1)
            setDesc("DESC")

        }else{
            setDateMsg("최근 댓글")
            setDate("date")
            setPage(1)
            setDesc("ASC")
        }
    }


    {/* 댓글들 받아와서 반복문 돌림*/}
    const render = reviews.map((review,index)  =>{
        return(
            
            <div key={"review"+review.id} className="reviewDiv" id={review.id}>
                    <div key={'reviewcontent'+review.id}>{review.username} / 등록날짜 : {review.date.substring(0,10)}
                        <ReactStars key={'starScore'+review.id} edit={false} value={review.score}/> 
                        <div className="reviewDelChange" key={'reviewdelchange'+review.id}>
                        {
                            (userID === review.username) ? <span key={'modifyText'+review.id} onClick={()=>{modify(review.id, review.content, review.score)}}>수정 /</span> : ""
                        }
                        {
                            (userID === review.username) ? <span key={'delText'+review.id} onClick={()=>{delReview(review.id, review.itemname)}}>삭제</span> : ""
                        }
                        </div>
                    </div>
                    <div  key={'reviewcontend'+review.id}>{review.content}</div>
                    {/* 댓글 수정폼 부분 */}
                        <div key={'modify'+review.id} id={'modify'+review.id} style={{display:"none"}}>
                            <ReactStars key={'starts'+review.id} count={5} onChange={ratingChanged} size={24} color2={'#ffd700'} value={score}  />
                            <InputGroup key={'InputGroup'+review.id}>
                            {/* <FormControl key={'FormControl'+review.id} as="textarea" aria-label="With textarea" onChange={makeContent2(review.id,forReviewContent)} value={forReviewContent}></FormControl> */}
                            <FormControl key={'FormControl'+review.id} as="textarea" aria-label="With textarea" onChange={makeContent} value={content}></FormControl>
                            <Button type="submit" key={'button'+review.id} onClick={()=>{modifyReview(review.id, score, content )}}>리뷰 수정</Button>
                            </InputGroup>
                        </div> 
                    <br/>
            </div>
             
        )
    })

    return(
        <div className="reviews">
            {
                allReviewNums != 0 ?
                <div className="BestButtons centered" >
                {/* 후기 별점 .. 변경버튼 */}
                <span onClick={orderReview} variant="secondary">{reviewMsg}</span>&nbsp;&nbsp;
                <span onClick={orderDate}  variant="secondary">{dateMsg}</span>&nbsp;&nbsp;
                </div> : ""
            }
            <br/>
           {render}
           <div className="myPage centered">
               {/* {
                   allReviewNums != 0 ?  <ReactPaginate 
                   pageCount={Math.ceil(allReviewNums / 5)}
                   pageRangeDisplayed={2}
                   marginPagesDisplayed={0}
                   breakLabel={""}
                   onPageChange={handlePageChange}
                   containerClassName={"pagination-ul"}
                   activeClassName={"currentPage"}
                   previousClassName={"pageLabel-btn"}
                   nextClassName={"pageLabel-btn"}/> : ""
               } */}

               {
                    allReviewNums != 0 ? <Page
                    setPage = {handlePage}
                    reviewNum = {allReviewNums}
                    selected = {page}
                /> : ""
                }

             </div>
        </div>
    )
}

export default ReviewView