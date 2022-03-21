import React, { useCallback, useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import BestCardWrapper from "../components/Base/main/BestCarpWrapper";
import GetBestItems from "../hooks/GetBestItems";
import "../css/sidebar.css"

const Home = ()=>{
    // 9상의 10반팔 11긴팔 12하의 13반바지 14긴바지 15아우터 16코트 17패딩 18모자 19신발
    console.log('Home 랜더링')

    const [Homelendering , setHomeLandering] = useState(false)

    // 베스트 아이템들 url을 변경하기 위한 state
    const [BestItemUrl , setBestItemUrl] = useState('/main/bestItem')

    // 베스트 아이템들 (기본 url 후기Best) 전체 Best
    GetBestItems(BestItemUrl)


    // 일반 모든 상품
    // GetMainItems()

    return(
        <div>
        <Container className="pdtContainer centered" style={{width: "auto",cursor:"auto"}} >
            <Row >
                <Col sm={12}>
                    <Row>
                        <br/><br/><br/><br/>
                        <div className="bestpdts">
                            <BestCardWrapper cata = {"bestPdt"} setHomeLandering={setHomeLandering} HomeLandering={Homelendering}/>
                            {/* best상품을 렌더링 할 component */}
                        </div>
                    </Row>
                        <br/><br/><br/><br/>
                    <Row>
                        {/* <h1 className="centered" >ALL PRODUCT</h1> */}
                        <div className="pdts">
                            {/* <CardWrapper cata={"basic"} setHomeLandering={setHomeLandering} HomeLandering={Homelendering} /> */}
                            {/* 일반상품을 렌더링할 component */}
                        </div>
                    </Row>
                </Col>
            </Row>
        </Container>
        </div>
    )
}

export default React.memo(Home);