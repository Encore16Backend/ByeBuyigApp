import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import CateCardWrapper from "../components/Base/main/pdt/CateCardWrapper";
import {useSelector} from 'react-redux'
import GetTotalPage from "../hooks/pdtHook/GetTotalPage";
import { useHistory } from "react-router-dom";
import { useRouteMatch } from "react-router-dom/cjs/react-router-dom.min";
import GetCate from "../hooks/pdtHook/GetCate";
import Page from "../components/Base/main/Page";
import { useDispatch } from "react-redux";
import { addNum } from "../redux/cataNum/actions";


const SearchList = ()=>{
    var history=useHistory();
    var match = useRouteMatch(); // url정보를 가지고있는 state
    var dispatch = useDispatch();
    
    // url에 사용될 변수들
    const [Homelendering , setHomeLandering] = useState(false)
    const [sortName , setSortName] = useState('reviewmean')
    const [asc, setAsc] = useState('DESC')
    const [page, setPage] = useState(1)
    const [cataNameState, setCataNameState] = useState("")

    // order에 따른 MSG
    const [reviewMsg, setReviewMsg] = useState('높은 별점순')
    const [priceMsg, setPriceMsg] = useState('높은 가격순')
    const [saleMsg, setSaleMsg] = useState('판매량 많은 순')

    // 검색어와 총 페이지 수
    const totalPage = useSelector(state=>state.totalPage.pages)
    const keyword = history ? history.location.state.keyword : ""
    const cataName = history.location.state.cataName

    // 검색url과 페이지 수를 받아올 url
    const [searchUrl ,setSearchUrl] = useState('/main/search?searchName='+keyword+" "+cataName);
    const [searchPageUrl, setSearchPageUrl] = useState('/main/search?searchName='+keyword+" "+cataName)

    // 검색어 바뀌면 실행 (page들과 값들을 받아옴)
    useEffect(()=>{
        const keyword = history.location.state.keyword
        const cataName = history.location.state.cataName 
        setCataNameState(cataName)
        dispatch(addNum(cataName))
        setPage(1)
        setSearchPageUrl('/main/search?searchName='+keyword+ " "+ cataName)
        setSearchUrl('/main/search?asc='+asc+"&sortname="+sortName+"&searchName="+keyword+" "+cataName);
        handlePage(1)
    }, [match, asc, sortName, cataName])

    const handlePage = (value)=>{
        setPage(value)
        setSearchUrl('/main/search?asc='+asc+"&sortname="+sortName+"&page="+value+"&searchName="+keyword+" "+cataName);
    }
   


    // 문자로 정렬할때
    const orderReview = (e)=>{
        if (reviewMsg == "높은 별점순"){
            setReviewMsg("낮은 별점순")
            setPage(1)
            setSortName("reviewmean")
            setAsc("DESC")
        }else{
            setReviewMsg("높은 별점순")
            setPage(1)
            setSortName("reviewmean")
            setAsc("ASC")
        }
    }
    const orderPrice = (e)=>{
        if (priceMsg == "높은 가격순"){
            setPriceMsg("낮은 가격순")
            setPage(1)
            setSortName("price")
            setAsc("DESC")
        }else{
            setPriceMsg("높은 가격순")
            setPage(1)
            setSortName("price")
            setAsc("ASC")
        }
    }
    const orderSales = (e)=>{
        if (saleMsg == "판매량 많은 순"){
            setSaleMsg("판매량 적은 순")
            setPage(1)
            setSortName("purchasecnt")
            setAsc("DESC")
        }else{
            setSaleMsg("판매량 많은 순")
            setPage(1)
            setSortName("purchasecnt")
            setAsc("ASC")
        }
    }


    // axiosHook
    GetCate(searchUrl)
    GetTotalPage(searchPageUrl)
    
    return(
        <>
        {/* <Realsidebar/> */}
        <Container className="pdtContainer centered container" style={{width: "76%"}}>
            <Row>
                <Col sm={12}>
                    <Row>
                        <br/><br/><br/><br/> 
                        <div className="BestButtons" >
                            {/* 후기 별점 .. 변경버튼 */}
                            <span onClick={orderReview} variant="secondary">{reviewMsg}</span>&nbsp;| &nbsp;
                            <span onClick={orderPrice}  variant="secondary">{priceMsg}</span>&nbsp;| &nbsp;
                            <span onClick={orderSales} variant="secondary">{saleMsg}</span>
                        </div>
                        <hr></hr>

                        <div className="bestpdts">
                            <CateCardWrapper cata = {"searchpdt"} setHomeLandering={setHomeLandering} HomeLandering={Homelendering}/>
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
        </>
    )
}


export default SearchList;