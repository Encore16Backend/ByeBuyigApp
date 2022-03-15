import React from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import postRefresh from "../../hooks/postRefresh";
import { useState } from "react";
import { FormControl, Table } from "react-bootstrap";
import ReactPaginate from "react-paginate"
import { Button, InputGroup } from "react-bootstrap";
import ReactStars from "react-stars"
import Page from "../Base/main/Page";
import "../../axiosproperties"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';




const ReviewView = ({ lendering, page, setLandering, setPage, setDesc, setDate, setIsReview, isReview }) => {

    const history = useHistory();
    const renderedItem = useSelector(state => state.oneItem.item)
    let allReviewNums = 0
    if (renderedItem) {
        allReviewNums = renderedItem.reviewcount
    }


    // 댓글의 점수와 내용
    const [content, setContent] = useState('')
    const [score, setScore] = useState(1)
    const [dateMsg, setDateMsg] = useState("최근 댓글")
    const [reviewMsg, setReviewMsg] = useState("높은 별점 순")
    // 댓글 수정시 값
    const makeContent = (e) => {
        setContent(e.target.value)
    }
    // 페이지 변경함수
    const handlePageChange = (e) => {
        setPage(e.selected + 1)
    }
    const handlePage = (data) => {
        console.log("보낼때")
        setPage(data)
    }
    // 리뷰배열과 아이디
    const reviews = useSelector(state => state.reviews.reviews)
    const userID = sessionStorage.getItem('id')
    // 문의사항 배열
    const inquirys = useSelector(state => state.inquiry.inquirys)
    const inquirysPage = useSelector(state => state.inquiry.pages)


    console.log(inquirysPage, "inqPage")
    console.log(allReviewNums, "allReviewNums")



    const [beforeform, setBeforeFrom] = useState('');
    // 수정폼 나오게한다
    const modify = (id,content,score)=>{
        let form = document.querySelector('#modify'+id);
        // 이전의 폼 상태 기억
        setBeforeFrom(form)
        if (form.style['display'] === 'none') {
            if (!!beforeform) {
                beforeform.style['display'] = 'none'
            }
            setContent(content)
            setScore(score)
            form.style['display'] = 'block'
        }
        else {
            form.style['display'] = 'none'
        }
    }
    // 리뷰수정
    const modifyReview = async (reviewid, score, content) => {
        await axios.put('/review/update', {
            // body
            id: reviewid,
            content: content,
            score: parseFloat(score)
            // 수정시 itemid를 보내기
            // pdtState.itemid
        }, {
            // header
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + sessionStorage.getItem('access_token')
            }
        }).then(res => {
            console.log(res, "res")
            setLandering(!lendering)
            modify(reviewid)
            alert('댓글 수정 완료')
        }).catch(error => {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            postRefresh() // 토큰이 없으면 재발행시키는 함수
            modifyReview(reviewid, score, content) //  토큰을 받고 실행하고 싶은 함수 다시 실행
        })
    }
    // 리뷰삭제
    const delReview = async (id, itemname) => {
        alert(id + "/" + itemname)
        await axios.delete('/review/delete', {
            params: {
                id: id,
                itemname: itemname
            }
        }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + sessionStorage.getItem('access_token')
            }
        }).then(res => {
            console.log(res, "res")
            setLandering(!lendering)
            alert('댓글 삭제 완료')
        }).catch(error => {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            postRefresh() // 토큰이 없으면 재발행시키는 함수
            delReview(id) //  토큰을 받고 실행하고 싶은 함수 다시 실행
        })
    }
    // 별점점수 바꾸는 함수
    const ratingChanged = (newRating) => {
        setScore(newRating)
    }


    // 문자열로 정렬할떄 함수
    const orderReview = (e) => {
        if (reviewMsg === "높은 별점 순") {
            setReviewMsg("낮은 별점 순")
            setDate("score")
            setPage(1)
            setDesc("DESC")

        } else {
            setReviewMsg("높은 별점 순")
            setDate("score")
            setPage(1)
            setDesc("ASC")
        }
    }
    const orderDate = (e) => {
        if (dateMsg === "최근 댓글") {
            setDateMsg("오래된 댓글")
            setDate("date")
            setPage(1)
            setDesc("DESC")

        } else {
            setDateMsg("최근 댓글")
            setDate("date")
            setPage(1)
            setDesc("ASC")
        }
    }




    {/* 댓글들 받아와서 반복문 돌림*/ }
    const render = reviews.map((review, index) => {
        return (
            <div key={"review" + review.id} className="reviewDiv" id={review.id}>
                <div key={'reviewcontent' + review.id}>{review.username} / 등록날짜 : {review.date.substring(0, 10)}
                    <ReactStars key={'starScore' + review.id} edit={false} value={review.score} />
                    <div className="reviewDelChange" key={'reviewdelchange' + review.id}>
                        {
                            (userID === review.username) ? <span key={'modifyText' + review.id} onClick={() => { modify(review.id, review.content, review.score) }}>수정 /</span> : ""
                        }
                        {
                            (userID === review.username) ? <span key={'delText' + review.id} onClick={() => { delReview(review.id, review.itemname) }}>삭제</span> : ""
                        }
                    </div>
                </div>
                <div key={'reviewcontend' + review.id}>{review.content}</div>
                {/* 댓글 수정폼 부분 */}
                <div key={'modify' + review.id} id={'modify' + review.id} style={{ display: "none" }}>
                    <ReactStars key={'starts' + review.id} count={5} onChange={ratingChanged} size={24} color2={'#ffd700'} value={score} />
                    <InputGroup key={'InputGroup' + review.id}>
                        <FormControl key={'FormControl' + review.id} as="textarea" aria-label="With textarea" onChange={makeContent} value={content}></FormControl>
                        <Button type="submit" key={'button' + review.id} onClick={() => { modifyReview(review.id, score, content) }}>리뷰 수정</Button>
                    </InputGroup>
                </div>
                <br />
            </div>
        )
    })

    // 글쓴이가 본인인지 확인하고 상세문의사항 페이지로 이동하는 함수

    const getDetailInquiry = (Q)=>{
        if (Q.username === sessionStorage.getItem('id')){
            history.push({
                pathname:"/inquiryDetail",
                state:Q
            })
        }
    }

    // 문의사항 받아와서 돌린다
    const inQRender = inquirys.map(Q =>{
// answer: ""
// chkanswer: 0
// content: "문의사항이 있습니다"
// date: "2022-03-14"
// id: 1
// itemid: 2
// itemname: "CONA 9085 기모옵션추가 딥워싱 브러쉬 루즈핏 와이드 스트레이트 데님 진청"
// title: "문의사항입니다"
// username: "qewrqwer"
        const inQ = <tr onClick={()=>{getDetailInquiry(Q)}} id={"inQ"+Q.id}>
                        <td>{Q.title}</td>
                        <td>{ Q.username === sessionStorage.getItem('id') ?  (Q.chkanswer == 0 ? "답변예정" : "답변완료") : <FontAwesomeIcon icon={faLock} />}</td>
                       
                    </tr> 
        return(
            inQ
        )
    })

    return (
        <div className="reviews">
            {/* 정렬용 버튼 */}

            {
                allReviewNums != 0 ? (isReview ?
                    <div className="BestButtons centered" >
                        {/* 후기 별점 .. 변경버튼 */}
                        <span onClick={orderReview} variant="secondary">{reviewMsg}</span>&nbsp;&nbsp;
                        <span onClick={orderDate} variant="secondary">{dateMsg}</span>&nbsp;&nbsp;
                    </div> : ""
                )
                    : ""
            }
            <br />

            {/* 댓글 랜더 */}
            {
                isReview ? render : (<div>
                    <Table style={{ textAlign: "center" }}>
                        <thead>
                            <tr >
                                <th>제목</th>
                                <th>답변여부</th>
                            </tr>
                        </thead>
                        <tbody>
                            {inQRender}
                        </tbody>
                    </Table>
                </div>)
            }
            {/* 리뷰 페이지부분 */}
            {
                isReview ? (<div className="myPage centered">{
                    allReviewNums != 0 ? <Page
                        setPage={handlePage}
                        reviewNum={allReviewNums}
                        selected={page}
                    /> : ""
                }</div>) : <div className="myPage centered">
                    {
                        inquirysPage != 0 ? <Page
                            setPage={handlePage}
                            totalPage={inquirysPage}
                            selected={page}
                        /> : ""
                    }
                </div>
            }

        </div>
    )
}

export default ReviewView