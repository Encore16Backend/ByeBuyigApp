import React, { useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { useState } from "react";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import CateCardWrapper from '../components/Base/main/pdt/CateCardWrapper'
import { addCateItems } from "../redux/CateItem/actions";
import { useDispatch } from "react-redux";
import '../axiosproperties'

const ImgSearchedList = ()=>{

    const frm = new FormData();
    var location = useLocation();
    var dispatch = useDispatch();
    const f = location.state.file
    const [file, setFile] = useState(f);

    useEffect(()=>{
        if (!!file) {
            const f = location.state.file
            setFile(f)
        } 
        frm.append("file", file);
        axios.post('/flask/retrieval', frm ).then((res)=>{        
            dispatch(addCateItems(res.data))
        }).catch(error =>{
            console.log(error)
        })
    },[location])

    
    return(
        <>
            <h2 className="centered">이미지  검색결과</h2>
            <Container className="pdtContainer centered container" style={{width: "76%"}}>
            <Row>
                <Col sm={12}>
                    <Row>
                        <div className="bestpdts">
                            <CateCardWrapper cata = {"imgsearchpdt"} />
                        </div>
                    </Row>
                </Col>
            </Row>
            </Container>
        </>
    )
}

export default ImgSearchedList