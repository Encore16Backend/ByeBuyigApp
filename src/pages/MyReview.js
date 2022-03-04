import React, { useEffect, useState } from "react";
import axios from "axios";
import { Form, Table } from "react-bootstrap";


const MyReview = () => {

    let [pageNo, setPathNo] = useState(1);
    let [totalPageNo, setTotalPageNo] = useState();
    const [review, setReview] = useState([]);

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

    return (
        <>
        <div><h1>마이리뷰</h1></div>
        <div className='centered'>
            <Table>
                <thead>
                    <tr>
                        <th>
                        <Form>
                            <div className="checkBox"><Form.Check type='checkbox' id='checkbox'/></div>
                        </Form>
                        </th>
                        <th></th>
                        <th>상품정보</th>
                        <th>작성일자</th>
                        <th colSpan={2}>후기</th>
                        <th>별점</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        review.map((data) => {
                            let reviewid = data.id
                            let itemname = data.itemname
                            let itemimage = data.itemimage
                            let score = data.score
                            let tmp = data.date.split('-')
                            let dateArr = tmp.slice(0, 2).concat(tmp[2].split('T')[0])
                            let content = data.content
                            let reviewData = 
                                <tr key={reviewid}>
                                    <td>
                                        <Form>
                                            <div className="checkBox"><Form.Check type='checkbox' className={`checkbox-${reviewid}`}/></div>
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
        </>
    )
}
export default MyReview;