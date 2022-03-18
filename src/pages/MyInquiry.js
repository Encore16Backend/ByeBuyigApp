import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container , Table} from "react-bootstrap";
import '../axiosproperties'
import Page from "../components/Base/main/Page";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const MyInquiry = ()=>{

    const history = useHistory();

    const [pageNo, setPageNo] = useState(1)
    const [inquirys, setInquirys] = useState([])
    const [totalPageNo, setTotalPageNo] = useState(1)

    const getMyInquiry = (pageNo)=>{
         axios.get('/inquiry/getInquiries',{
            params:{
                username : sessionStorage.getItem('id'),
                page : pageNo
            },
            headers:{
                "Content-Type": "application/json",
                "Authorization": "Bearer " + sessionStorage.getItem('access_token')
            }
        }).then(res =>{
            setInquirys(res.data.content)
            setTotalPageNo(res.data.totalPages)
        }).catch(error =>{
            console.log(error.response.data, "getMyInquiry");
            console.log(error.response.status, "getMyInquiry");
            console.log(error.response.headers, "getMyInquiry");
        })
    }

    const handlePage = (value)=>{
        setPageNo(value);
    }

    // 글쓴이가 본인인지 확인하고 상세문의사항 페이지로 이동하는 함수
    const getDetailInquiry = (Q)=>{
        history.push({
            pathname:"/inquiryDetail",
            state:Q
        })
    }

    const inQRender = inquirys.map(Q =>{   
                const inQ = <tr onClick={()=>{getDetailInquiry(Q)}}>
                                <td>  {Q.itemimage ? <img src={Q.itemimage} width="80" height="96"/> : "예전꺼라 이미지 없었음"} </td>
                                <td>{Q.itemname}</td>
                                <td> {Q.date} </td>
                                <td>{Q.title}</td>
                                <td>{Q.chkanswer == 0 ? "답변예정" : "답변완료"}</td>
                            </tr> 
                return(
                    inQ
                )
            })

// data:
// content: (5) [{…}, {…}, {…}, {…}, {…}]
// empty: false
// first: true
// last: false
// number: 0
// numberOfElements: 5
// pageable: {sort: {…}, offset: 0, pageNumber: 0, pageSize: 5, unpaged: false, …}
// size: 5
// sort: {empty: false, sorted: true, unsorted: false}
// totalElements: 7
// totalPages: 2

// answer: ""
// chkanswer: 0
// content: "됩니까?"
// date: "2022-03-14"
// id: 3
// itemid: null
// itemname: "CONA 9085 기모옵션추가 딥워싱 브러쉬 루즈핏 와이드 스트레이트 데님 진청"
// title: "한방에"
// username: "qwerqwer"

    useEffect(()=>{
        getMyInquiry(pageNo)
    }, [pageNo])

    return(
        <div>
            <Container>
            <br/><br/>
                <h2 className="centered">내 문의사항 내역</h2>
                <div>
                    <Table style={{textAlign:"center"}}>
                        <thead>
                            <tr >
                                <th style={{width:"10%"}}>상품이미지</th>
                                <th style={{width:"*"}}>상품명</th>
                                <th style={{width:"10"}}>날짜</th>
                                <th style={{width:"15%"}}>제목</th>
                                <th style={{width:"15%"}}>답변여부</th>
                            </tr>
                        </thead>
                        <tbody>
                            {inQRender}
                        </tbody>
                    </Table>
                </div>



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
        </div>
    )
}

export default MyInquiry