import react, { useEffect, useState } from "react";
import { Container, Row, Col, Carousel, Card, Button, Offcanvas, ButtonToolbar, ButtonGroup } from "react-bootstrap";
import GetCate from "../hooks/pdtHook/GetCate"
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import CateCardWrapper from "../components/Base/main/pdt/CateCardWrapper";
import ReactPaginate from 'react-paginate'
import {useSelector} from 'react-redux'


const CateList = ()=>{
    // 9상의 10반팔 11긴팔 12하의 13반바지 14긴바지 15아우터 16코트 17패딩 18모자 19신발
    const location = useLocation();
    // 카테고리 id liocation으로 받아옴
    const id = location.state.id
    console.log(location , "location")

    const [Homelendering , setHomeLandering] = useState(false)

    // 들어온 카테고리의 상세 넘버
    const pdtNum = useSelector(state => state.cateItem.items.length)
    // url을 전달할 변수
    const [BestItemUrl , setBestItemUrl] = useState('/main/category/order?category='+id)
    // order값을 전달할 변수
    const [orderNum , setOrderNum] = useState('')

    const [chk, setChk] = useState({ 
         // 여기 state객체의 값을 바꾸고 렌더링하고싶으면
        flag:false
    }) 

    useEffect(()=>{ 
        const newId = location.state.id
        setChk({ // 함수에서 set을 호출하고 
            ...chk, // 기존객체를 받아오고
            flag : !!chk.flag // 그리고 받아온 객체를 수정하면
        }) // 새로운 chk 객체가리턴되어서 다시 렌더링이 됩니다
        setBestItemUrl('/main/category/order?category='+newId)
    }, [location])

    

    console.log(BestItemUrl)
    console.log(orderNum , "orderNum입니다")

    // 넘어온 상품
    // GetCate(url)
    GetCate(BestItemUrl)


    // 베스트 아이템들 (기본 url 후기Best) 전체 Best


    // 후기 판매량, 가격에서 best상품을 가져오도록 url을 수정하는 함수
    const changeBestItemUrl = (url)=>{
        setBestItemUrl(url)
    }
    // order번호를 수정하는 함수
    const changeOrderNum= (num)=>{
        setOrderNum(num)
    }

    const handlePageChange = (e)=>{
        let page = e.selected+1
        if (!!orderNum){
            setBestItemUrl('/main/category/order?category='+id+"&order="+orderNum+"&page="+page)
        }else{
            setBestItemUrl('/main/category/order?category='+id+"&page="+page)
        }
    }

    return(
        <>
        <Container>
            <Row>
                <Col sm={12}>
                    <Row>
                        <br/><br/><br/><br/> 
                        <h1 className="centered" >BEST PRODUCT</h1>
                        <div className="BestButtons">
                            {/* 후기 별점 .. 변경버튼 */}
                            {/* 판매량 낮은가격 높은가격 후기 */}
                            <span onClick={() => {
                                changeOrderNum('4')
                                changeBestItemUrl("/main/category/order?category="+id+"&order=4")
                               
                            }} variant="secondary">
                                후기
                            </span>&nbsp;&nbsp;
                            <span onClick={() => {
                                changeOrderNum('3')
                                changeBestItemUrl("/main/category/order?category="+id+"&order=3")
                            
                            }}  variant="secondary">높은가격순</span>&nbsp;&nbsp;
                            <span onClick={() => {
                                changeOrderNum('2')
                                changeBestItemUrl("/main/category/order?category="+id+"&order=2")
                             
                            }}  variant="secondary">낮은가격순</span>&nbsp;&nbsp;
                            <span onClick={() => {
                                changeOrderNum('1')
                                changeBestItemUrl("/main/category/order?category="+id+"&order=1")
                             
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
                    <ReactPaginate
                         pageCount={Math.ceil(pdtNum / 10)}
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
                    />
                    </div>
                </Col>
            </Row>
        </Container>
        </>
    )
}


export default CateList;