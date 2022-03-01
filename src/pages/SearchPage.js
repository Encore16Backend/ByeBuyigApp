import react, { useEffect, useState } from "react";
import { Container, Row, Col, Carousel, Card, Button, Offcanvas, ButtonToolbar, ButtonGroup, Form } from "react-bootstrap";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import CateCardWrapper from "../components/Base/main/pdt/CateCardWrapper";
import ReactPaginate from 'react-paginate'
import {useDispatch, useSelector} from 'react-redux'
import { addNum } from "../redux/cataNum/actions";
import GetTotalPage from "../hooks/pdtHook/GetTotalPage";
import { useHistory } from "react-router-dom";
import { useRouteMatch } from "react-router-dom/cjs/react-router-dom.min";
import GetCate from "../hooks/pdtHook/GetCate";


const SearchList = ()=>{
    var history=useHistory();
    var match = useRouteMatch(); // url정보를 가지고있는 state
    console.log(history, "역사입니다")
    
    const [Homelendering , setHomeLandering] = useState(false)
    const [sortName , setSortName] = useState('reviewmean')
    const [asc, setAsc] = useState('DESC')
    const [page, setPage] = useState(1)

    const totalPage = useSelector(state=>state.totalPage.pages)
    const keyword = history.location.state.keyword

    const [searchUrl ,setSearchUrl] = useState('/main/search?searchName='+keyword);
    const [searchPageUrl, setSearchPageUrl] = useState('/main/search?searchName='+keyword)

    // 검색어 바뀌면 실행 (page들과 값들을 받아옴)
    useEffect(()=>{
        const keyword = history.location.state.keyword
        console.log(keyword, "useStat키워드")
        setSearchPageUrl('/main/search?searchName='+keyword)
        setSearchUrl('/main/search?searchName='+keyword+"&asc="+asc+"&sortname="+sortName);
    }, [match, asc, sortName])

    // 페이징 버튼 클릭시 사용할 함수
    const handlePageChange = (e)=>{
        setSearchUrl('/main/search?searchName='+keyword+"&asc="+asc+"&sortname="+sortName+"&page="+(e.selected+1));
    }
    
      // 리뷰 정렬값들을 받을 state
      const [conditionSelect,setConditionSelect ] = useState('')
      const [sortSelect, setSortSelect] = useState('')
      const makeCondition = (e)=>{
          setConditionSelect(e.target.value)
          if (e.target.value === "purchasecnt"){
              setPage(1)
              setSortName('purchasecnt')
          }else if (e.target.value === "reviewmean"){
              setPage(1)
              setSortName('reviewmean')
          }else if (e.target.value === "price"){
              setPage(1)
              setSortName('price')
        }
      }
      const makeSort = (e)=>{
          alert(e.target.value)
          setSortSelect(e.target.value)
          if (e.target.value === "DESC"){
              setPage(1)
              setAsc("DESC")
          }else if (e.target.value === "ASC"){
              setPage(1)
              setAsc("ASC")
          }
      }

    GetCate(searchUrl)
    GetTotalPage(searchPageUrl)
    return(
        <>
        <Container>
            <Row>
                <Col sm={12}>
                    <Row>
                        <br/><br/><br/><br/> 
                        {/* <h1 className="centered" >PDTS</h1> */}
                        <div>
                        <Form.Select size="sm" onChange={makeCondition} value={conditionSelect}>
                            <option value="purchasecnt">판매수량순</option>
                            <option value="reviewmean">별점순</option>
                            <option value="price">가격순</option>
                        </Form.Select>
                        <Form.Select size="sm" onChange={makeSort} value={sortSelect}>
                            <option value="DESC">내림차순</option>
                            <option value="ASC">오름차순</option>
                        </Form.Select>
                        </div>

                        <div className="bestpdts">
                            <CateCardWrapper cata = {"searchpdt"} setHomeLandering={setHomeLandering} HomeLandering={Homelendering}/>
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
                            pageRangeDisplayed={2}
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


export default SearchList;