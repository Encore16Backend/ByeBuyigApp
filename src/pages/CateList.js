import React, { useEffect, useState } from "react";
import { Container, Row, Col, Carousel, Card, Button, Offcanvas, ButtonToolbar, ButtonGroup, Nav } from "react-bootstrap";
import GetCate from "../hooks/pdtHook/GetCate"
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import CateCardWrapper from "../components/Base/main/pdt/CateCardWrapper";
import ReactPaginate from 'react-paginate'
import {useDispatch, useSelector} from 'react-redux'
import { addNum } from "../redux/cataNum/actions";
import GetTotalPage from "../hooks/pdtHook/GetTotalPage";
import Realsidebar from "../components/Base/Side/Realsidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Page from "../components/Base/main/Page";

const CateList = ()=>{

    const dispatch = useDispatch()
    const location = useLocation();
    // 카테고리 id liocation으로 받아옴
    const id = location.state.id
    const cataname = location.state.cataname
    // 들어오면 카테고리id를 받아 리덕스에 저장시킴
    const totalPage = useSelector(state=>state.totalPage.pages)
    // 하위 컴포넌트들이 렌더링되면 함께 렌더링되기 위함 
    const [Homelendering , setHomeLandering] = useState(false)
    // url을 전달할 변수
    const [BestItemUrl , setBestItemUrl] = useState('/main/category/order?category='+cataname)
    // page값을 위한 url을 전달할 변수
    const [pageUrl , setPageUrl] = useState('/main/category/order?category='+cataname)
    // order값을 전달할 변수
    const [orderNum , setOrderNum] = useState(1)


    let [page, setPage] = useState(1);
    const [chk, setChk] = useState({ 
        flag:false
    }) 

    useEffect(()=>{
        dispatch(addNum(cataname))
    },[cataname])

    useEffect(()=>{ 
        const category = location.state.cataname
        setChk({ // 함수에서 set을 호출하고 
            ...chk, // 기존객체를 받아오고
            flag : !!chk.flag // 그리고 받아온 객체를 수정하면
        }) // 새로운 chk 객체가리턴되어서 다시 렌더링이 됩니다
        setBestItemUrl('/main/category/order?category='+location.state.cataname+"&order=1&page=1")
        setPageUrl('/main/category/order?category='+location.state.cataname)
        handlePage(1)
    }, [location])

    
    const handlePage = (value)=>{
        setPage(value)
        setBestItemUrl('/main/category/order?category='+cataname+"&order="+orderNum+"&page="+value);
    }
 
    // axios
    GetCate(BestItemUrl);
    GetTotalPage(pageUrl)

    // 후기 판매량, 가격에서 best상품을 가져오도록 url을 수정하는 함수
    const changeBestItemUrl = (url)=>{
        setBestItemUrl(url)
    }
    // order번호를 수정하는 함수
    const changeOrderNum= (num)=>{
        setOrderNum(num)
    }

    // order에 따른 MSG
    const [reviewMsg, setReviewMsg] = useState('높은 별점순')
    const [priceMsg, setPriceMsg] = useState('높은 가격순')
    const [saleMsg, setSaleMsg] = useState('판매량 많은 순')
     // 문자로 정렬할때
     const orderReview = (e)=>{
        if (reviewMsg == "높은 별점순"){
            setReviewMsg("낮은 별점순")
            // setPage(1)
            handlePage(1)
        }else{
            setReviewMsg("높은 별점순")
            // setPage(1)
            handlePage(1)
        }
    }
    const orderPrice = (e)=>{
        if (priceMsg == "높은 가격순"){
            setPriceMsg("낮은 가격순")
            // setPage(1)
            handlePage(1)
        }else{
            setPriceMsg("높은 가격순")
            // setPage(1)
            handlePage(1)
            
        }
    }
    const orderSales = (e)=>{
        if (saleMsg == "판매량 많은 순"){
            setSaleMsg("판매량 적은 순")
            // setPage(1)
            handlePage(1)
            
        }else{
            setSaleMsg("판매량 많은 순")
            // setPage(1)
            handlePage(1)
        }
    }

    
    return(
        <>
        {/* <Realsidebar/> */}
        <Container className="pdtContainer centered" style={{width: "76%"}}>
            <Row>
                <Col sm={12}>
                    <Row>
                        <br/><br/><br/><br/> 
                        {/* <h1 className="centered" >{cataname}</h1> */}
                            <div className="BestButtons" >
                            <span onClick={() => {
                                changeOrderNum('3')
                                changeBestItemUrl("/main/category/order?category="+cataname+"&order=3")
                            }}  variant="secondary">높은가격순</span>&nbsp;| &nbsp;
                            <span onClick={() => {
                                changeOrderNum('2')
                                changeBestItemUrl("/main/category/order?category="+cataname+"&order=2")
                            }}  variant="secondary">낮은가격순</span>&nbsp;| &nbsp;
                            <span onClick={() => {
                                changeOrderNum('1')
                                changeBestItemUrl("/main/category/order?category="+cataname+"&order=1")
                            }} variant="secondary">판매량</span>&nbsp;| &nbsp;
                            <span onClick={() => {
                                changeOrderNum('4')
                                changeBestItemUrl("/main/category/order?category="+cataname+"&order=4")
                            }} variant="secondary">
                                후기
                            </span>
                        </div>

                        <hr></hr>

                        <div className="bestpdts">
                            <CateCardWrapper cata = {"catapdt"} setHomeLandering={setHomeLandering} HomeLandering={Homelendering}/>
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
        </>
    )
}


export default CateList;