import React, { useEffect, useState } from "react";
import axios from "axios";
import { Form, Table, Button } from "react-bootstrap";
import "../css/myreview.css";
import Page from "../components/Base/main/Page";
import { Container } from "react-bootstrap";

const MyReview = () => {

    let [pageNo, setPathNo] = useState(1);
    let [totalPageNo, setTotalPageNo] = useState();
    const [review, setReview] = useState([]);
    const [checkReviews, setCheckReviews] = useState([]);
    const [checkItems, setCheckItems] = useState([]);

    useEffect(() => {
        axios.get("http://127.0.0.1:8081/review/byUsername", {
            params: {
                username:localStorage.getItem('id'),
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
        })
    }, [pageNo])

    const onSubmit = async () => {
        await axios.delete("http://127.0.0.1:8081/review/delete", {
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
        setPathNo(value);
    }
    
    return (
        <>
        <Container>
        <Form className='review' onSubmit={onSubmit}>
        <div className='title'>마이리뷰</div>
       
        <div>
            <Button type="submit" className="remove" variant="secondary" size="sm">삭제</Button>
        </div>
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
                                <tr key={reviewid}>
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
                                        <img src={itemimage} width="80" height="96" style={{marginRight:"5px"}}/>
                                    </td>
                                    <td>  {/* colSpan={2} */}
                                        
                                        {itemname}
                                    </td>
                                    <td>{dateArr.join('-')}</td>
                                    <td colSpan={2}>
                                        {content}
                                    </td>
                                    <td>{score}</td>
                                </tr>
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