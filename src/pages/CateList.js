import react, { useEffect, useState } from "react";
import { Container, Row, Col, Carousel, Card, Button, Offcanvas, ButtonToolbar, ButtonGroup } from "react-bootstrap";
import GetCate from "../hooks/pdtHook/GetCate"
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import CateCardWrapper from "../components/Base/main/pdt/CateCardWrapper";
import ReactPaginate from 'react-paginate'
import {useDispatch, useSelector} from 'react-redux'
import { addNum } from "../redux/cataNum/actions";
import GetTotalPage from "../hooks/pdtHook/GetTotalPage";


const CateList = ()=>{
    // 9상의 10반팔 11긴팔 12하의 13반바지 14긴바지 15아우터 16코트 17패딩 18모자 19신발
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
        dispatch(addNum(id))
        setOrderNum(1)
    },[id])

    useEffect(()=>{ 
        const category = location.state.cataname
        setChk({ // 함수에서 set을 호출하고 
            ...chk, // 기존객체를 받아오고
            flag : !!chk.flag // 그리고 받아온 객체를 수정하면
        }) // 새로운 chk 객체가리턴되어서 다시 렌더링이 됩니다
        setBestItemUrl('/main/category/order?category='+location.state.cataname+"&order=1&page=1")
        setPageUrl('/main/category/order?category='+location.state.cataname)
    }, [location])
    
    const handlePageChange = (e)=>{
        setPage(e.selected+1);
        setBestItemUrl('/main/category/order?category='+cataname+"&order="+orderNum+"&page="+(e.selected+1));
    }
    // 넘어온 상품
    // GetCate(url)
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

    
    return(
        <>
        <Container>
            <Row>
                <Col sm={12}>
                    <Row>
                        <br/><br/><br/><br/> 
                        <h1 className="centered" >{cataname}</h1>
                        <div className="BestButtons">
                            {/* 후기 별점 .. 변경버튼 */}
                            {/* 판매량 낮은가격 높은가격 후기 */}
                            <span onClick={() => {
                                changeOrderNum('4')
                                changeBestItemUrl("/main/category/order?category="+cataname+"&order=4")
                               
                            }} variant="secondary">
                                후기
                            </span>&nbsp;&nbsp;
                            <span onClick={() => {
                                changeOrderNum('3')
                                changeBestItemUrl("/main/category/order?category="+cataname+"&order=3")
                            
                            }}  variant="secondary">높은가격순</span>&nbsp;&nbsp;
                            <span onClick={() => {
                                changeOrderNum('2')
                                changeBestItemUrl("/main/category/order?category="+cataname+"&order=2")
                             
                            }}  variant="secondary">낮은가격순</span>&nbsp;&nbsp;
                            <span onClick={() => {
                                changeOrderNum('1')
                                changeBestItemUrl("/main/category/order?category="+cataname+"&order=1")
                             
                            }} variant="secondary">판매량</span>
                        </div>

                        <div className="bestpdts">
                            <CateCardWrapper cata = {"catapdt"} setHomeLandering={setHomeLandering} HomeLandering={Homelendering}/>
                            {/* id로 받은 상품을 렌더링 할 component */}
                        </div>
                    </Row>
                </Col>
            </Row>

            <Row>
                <Col>
{/* pageCount - 총 게시글의 개수(총 row 수)
pageRangeDisplayed - 한 페이지에 표시할 게시글의 수
marginPagesDisplayed - 
breakLabel - 페이지 수가 많을 경우 건너뛸 수 있는 버튼
previousLabel - 이전페이지로 가는 버튼의 value값
nextLabel - 다음페이지로 가는 버튼의 value값
onPageChange - 페이지 버튼을 눌렀을 때 일어나는 이벤트 이를 이용해 페이지 증감
containerClassName - css적용할 때 사용
activeClassName - 현재 페이지에 css처리해주기 위한 클래스명을 적으면 됨
previousClassName/NextClassName - 이전/다음버튼 css적용위한 클래스명을 적으면 됨 */}
                    <div className="myPage centered">
                        {
                            totalPage != 0 ?   <ReactPaginate
                            pageCount={Math.ceil(totalPage)}
                            pageRangeDisplayed={3}
                            marginPagesDisplayed={0}
                            breakLabel={""}
                            previousLabel={"이전"}
                            nextLabel={"다음"}
                            onPageChange={handlePageChange}
                            containerClassName={"pagination-ul"}
                            activeClassName={"currentPage"}
                            previousClassName={"pageLabel-btn"}
                            nextClassName={"pageLabel-btn"}
                            /> : ""
                        }
                    </div>
                </Col>
            </Row>
        </Container>
        </>
    )
}


export default CateList;