import React, { useEffect, useState } from "react";
import axios from "axios";
import { Form, Table, Button, InputGroup, FormControl, Row, Col} from "react-bootstrap";
import "../css/myreview.css";
import Page from "../components/Base/main/Page";
import { Container } from "react-bootstrap";
import ReactStars from "react-stars";
import postRefresh from "../hooks/postRefresh";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import '../axiosproperties'
import MyCalendar from "../components/etc/MyCalendar";


const MyReview = () => {

    // 댓글의 점수와 내용
    const [contentChange , setContent] = useState('')
    const [scoreChange, setScore] = useState(1)

    // 별점점수 바꾸는 함수
    const ratingChanged = (newRating)=>{
        setScore(newRating)
    }
    // 댓글 수정시 값
    const makeContent = (e)=>{
        setContent(e.target.value)
    }


    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();

    const getStringDate = (localeDate)=>{
        // Wed Mar 23 2022 10:21:20 GMT+0900 (한국 표준시)
        const tmp = JSON.stringify(localeDate)
        const strDate = tmp.slice(1, 11)
        return strDate
    }

    // 리뷰수정
    const modifyReview = async (reviewid,score,content)=>{
        await axios.put('/review/update',{
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
            alert('댓글 수정 완료')
            setPageNo(1)
        }).catch(error =>{
            alert("수정실패")
            console.log(error);
            // postRefresh() // 토큰이 없으면 재발행시키는 함수
            // modifyReview(reviewid,score,content) //  토큰을 받고 실행하고 싶은 함수 다시 실행
        })
    }
    

    let [pageNo, setPageNo] = useState(1);
    let [totalPageNo, setTotalPageNo] = useState();
    const [review, setReview] = useState([]);
    const [checkReviews, setCheckReviews] = useState([]);
    const [checkItems, setCheckItems] = useState([]);

    // 수정 창 나오게 할 state
    const [openedContentId, setOpenedContentId] = useState(-1);


     // 날짜로 리뷰검색
     const searchReviewDate = (userid, pageNo, startDate, endDate) => {
        setIsDate(true)
        axios.get('/review/getReviews', {
            params: {
                username: userid,
                page: pageNo,
                start : startDate != null ? getStringDate(startDate) : "",
                end : endDate != null ? getStringDate(endDate) : "" 
            },
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + sessionStorage.getItem('access_token')
            }
        }).then(res => {
            const data = res.data
            setTotalPageNo(data.totalPages);
            setReview(data.content)
        }).catch(error => {
            console.log(error, ' searchReviewDate 에러');
        })
    }

    const AllReview = ()=>{
        setIsDate(false)
        axios.get("/review/getReviews", {
            params: {
                username:sessionStorage.getItem('id'),
                page:pageNo,
            },
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + sessionStorage.getItem('access_token'),
            }
        }).then(res => {
            const data = res.data;
            setTotalPageNo(data.totalPages);
            setReview(data.content)
        }).catch(err => {
            console.log(err);
            postRefresh()
        })
    }

     // 최초 들어올때는 전체조회 useEffect
     useEffect(()=>{
        AllReview(pageNo)
    }, [])

    // 날짜가 바뀌면 날짜검색으로 useEffect (startDate, endDate)
    useEffect(()=>{
        setPageNo(1)
        searchReviewDate(sessionStorage.getItem('id'), pageNo, startDate, endDate)
    }, [startDate, endDate])

    // 전체검색 버튼을 누르면 다시 전체조회
    const getAllReview = ()=>{
        setPageNo(1)
        setStartDate()
        setEndDate()
        AllReview(pageNo)
    }

    // 페이징 번호가 바뀌면 .. 날짜상태인기 전체상태인지 확인하는 state를 만들어 state확인 후 
    const [isDate, setIsDate] = useState(false)
    useEffect(()=>{
        if (isDate){    
            searchReviewDate(sessionStorage.getItem('id'), pageNo, startDate, endDate)
        }else{
            AllReview(pageNo)
        }
    }, [pageNo])

    // 리뷰삭제
    const onSubmit = async () => {
        await axios.delete("/review/delete", {
            params: {
                reviewid:checkReviews,
                itemid:checkItems
            },
        }).then(res => {
            if (res === "FAIL") {
                alert("리뷰 삭제 실패");
            }
            setCheckReviews([]);
            setCheckItems([]);
        }).catch(err => {
            console.log(err)
            // postRefresh()
            // onSubmit()
        }) 
    }

    const reviewCheck = (checked, reviewid, itemid) => {
        if (checked) {
            setCheckReviews([...checkReviews, reviewid]);
            setCheckItems([...checkItems, itemid]);
        } else {
            // 체크 해제
            setCheckReviews(checkReviews.filter((x) => x !== reviewid));
            setCheckItems(checkItems.filter((x) => x != itemid));
        }
    }

    const allReviewCheck = (checked) => {
        if (checked) {
            const reviewid = []; // `checkbox-${reviewid}`
            const itemid = [];
            review.forEach((res) => {
                reviewid.push(res.id);
                itemid.push(res.itemid);
            });
            setCheckReviews(reviewid);
            setCheckItems(itemid);
        } else {
            // 전체 체크 박스 제거
            setCheckReviews([]);
            setCheckItems([]);
        }
    }
    
    const handlePage = (value)=>{
        setPageNo(value);
    }



    
    return (
        <>
        <Container>
        <Form className='review' onSubmit={onSubmit}>
        <Row>
                
                <h1 className='centered' >마이리뷰</h1>
                <MyCalendar startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate}  />                
                <Button onClick={getAllReview} style={{position:"relative",width:"70px", bottom: "38px",left: "450px"}}>Clean</Button>
        </Row>
        
            <Button type="submit" className="remove" variant="secondary" size="sm">삭제</Button>
        
        <div>
            <Table>
                <thead>
                    <tr>
                        <th className="checkBox">
                            <div >
                                <Form.Check 
                                    type='checkbox' id='checkbox'
                                    onChange={(e) => allReviewCheck(e.target.checked)}
                                    checked={checkReviews.length === 5 ? true : false}
                                    />
                            </div>
                        </th>
                        <th></th>
                        <th>상품정보</th>
                        <th className='date'>작성일자</th>
                        <th colSpan={2}>후기</th>
                        <th>별점</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        review.map((data) => {
                            let reviewid = data.id
                            let itemid = data.itemid
                            let itemname = data.itemname
                            let itemimage = data.itemimage
                            let score = data.score
                            let tmp = data.date.split('-')
                            let dateArr = tmp.slice(0, 2).concat(tmp[2].split('T')[0])
                            let content = data.content
                            let reviewData = 
                            <>
                                <tr key={reviewid}  onClick={()=> {
                                if(openedContentId === reviewid){
                                    setOpenedContentId(-1);
                                }else{
                                    setOpenedContentId(reviewid);
                                    setContent(content)
                                    setScore(score)
                                }}}>
                                    <td className="checkBox">
                                        <Form>
                                            <div className="checkBox">
                                                <Form.Check 
                                                    type='checkbox' className={`checkbox-${reviewid}`}
                                                    onChange={(e) => reviewCheck(e.target.checked, reviewid, itemid)}
                                                    checked={checkReviews.includes(reviewid) ? true : false}
                                                    />
                                            </div>
                                        </Form>
                                    </td>
                                    <td>
                                        <img src={`https://byebuying.s3.ap-northeast-2.amazonaws.com/`+itemimage} width="80" height="96" style={{marginRight:"5px"}}/>
                                    </td>
                                    <td>
                                        <Link to={{ pathname:"/detail", search : "?itemid="+itemid,state : {itemid : itemid,},}} >
                                        {itemname}
                                        </Link>
                                    </td>
                                    <td>{dateArr.join('-')}</td>
                                    <td colSpan={2}>
                                        {content}
                                    </td>
                                    <td>
                                        <ReactStars key={'starScore'+reviewid} edit={false} value={score}/> 
                                    </td>
                                    <td>
                                    {
                                    <Button key={'modifyText'+reviewid}   onClick={()=> {
                                        if(openedContentId === reviewid){
                                            setOpenedContentId(-1);
                                        }else{
                                            setOpenedContentId(reviewid);
                                            setContent(content)
                                            setScore(score)
                                        }}} className="remove modifyButton" variant="secondary" size="sm" >수정</Button>
                                    }
                                    </td>
                                </tr>
                                {
                                    openedContentId === reviewid &&
                                    <tr key={'trtr'+reviewid}>
                                        <td colSpan={10} id={'td'+ reviewid} key={'td'+ reviewid} > {/* style={{display:"none"}} */}
                                            <div key={'modify'+reviewid} id={'modify'+reviewid} style={{ widht:"1276px" }}> {/* display:"none", */}
                                                <FormControl key={'FormControl'+reviewid} as="textarea" aria-label="With textarea" onChange={makeContent} value={contentChange}></FormControl>
                                                <ReactStars key={'starts'+reviewid} count={5} onChange={ratingChanged} size={24} color2={'#ffd700'} value={scoreChange}  />
                                                <Button type="submit" key={'button'+reviewid} onClick={()=>{modifyReview(reviewid, scoreChange, contentChange)}}>수정완료</Button>
                                            </div>
                                        </td> 
                                    </tr>  
                                }
                            </>
                            return ( reviewData )
                        })
                    }
                    
                </tbody>
                
            </Table>
        </div>
        </Form>
        <div className="centered">
            {
                totalPageNo != 0 ? <Page
                    setPage = {handlePage}
                    totalPage = {totalPageNo}
                    selected = {pageNo}
                /> : ""
            }
        </div>
        </Container>
        </>
    )
}
export default MyReview;