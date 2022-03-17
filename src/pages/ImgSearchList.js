import React, { useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { useState } from "react";
import axios from "axios";
import Page from "../components/Base/main/Page";
import { Container, Row, Col } from "react-bootstrap";
import CateCardWrapper from '../components/Base/main/pdt/CateCardWrapper'
import { addCateItems } from "../redux/CateItem/actions";
import { useDispatch } from "react-redux";

const ImgSearchedList = ()=>{

    const frm = new FormData();
    var location = useLocation();
    var dispatch = useDispatch();
    const [file, setFile] = useState('');
    const [totalPage, setTotalPage] = useState(1)
    
    // 1안 state저장 후 사용 
    console.log(file , "fileState")
    // 2, 3안 세션저장후 사용
    // console.log(sessionStorage.getItem('frm') , "frm")
    // console.log(sessionStorage.getItem('file') , "file")

    const [page, setPage] = useState(1)

    useEffect(()=>{
        const f = location.state.file
        setFile(f)
        frm.append("file", file);
        axios.post('http://192.168.0.208:8081/flask/retrieval', frm ).then((res)=>{        
            setTotalPage(res.data.totalPage)
            // 디스패치로 cardwarpper에서 받을 데이터들을 저장, cardwarpper에서 꺼내서 사용함
            dispatch(addCateItems(res.data.content))
        }).catch(error =>{
            console.log(error)
        })
    },[page,location])


    const handlePage = (value)=>{
        setPage(value)
    }


    
    return(
        <div>
            <Container className="pdtContainer centered container" style={{width: "76%"}}>
            <Row>
                <Col sm={12}>
                    <Row>
                        <br/><br/><br/><br/> 
                        <div className="BestButtons" >
                            {/* 후기 별점 .. 변경버튼 */}
                            <span variant="secondary">정렬1</span>&nbsp;&nbsp;
                            <span variant="secondary">정렬</span>&nbsp;&nbsp;
                            <span variant="secondary">정렬3</span>
                        </div>
                        <hr></hr>

                        <div className="bestpdts">
                            <CateCardWrapper cata = {"imgsearchpdt"} />
                            {/* id로 받은 상품을 렌더링 할 component */}
                        </div>
                    </Row>
                </Col>
            </Row>
            </Container>
            <div className="myPage centered">
                {
                    totalPage != 0 ? <Page
                        setPage = {handlePage}
                        totalPage = {totalPage}
                        selected = {page}
                    /> : ""
                }
            </div>
        </div>
    )
}

export default ImgSearchedList