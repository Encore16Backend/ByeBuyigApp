import React, { useCallback, useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import BestCardWrapper from "../components/Base/main/BestCarpWrapper";
import GetBestItems from "../hooks/GetBestItems";


const Home = ()=>{
    const [Homelendering , setHomeLandering] = useState(false)
    // 베스트 아이템들 url을 변경하기 위한 state
    const [BestItemUrl , setBestItemUrl] = useState('/main/bestItem')

    // 베스트 아이템들 (기본 url 후기Best) 전체 Best
    GetBestItems(BestItemUrl)

    return(
        <Container className="pdtContainer centered" style={{width: "auto"}} >
            <Row>
                <Col>
                    <Row>
                        <br/><br/><br/><br/>
                        <div className="bestpdts">
                            <BestCardWrapper cata = {"bestPdt"} setHomeLandering={setHomeLandering} HomeLandering={Homelendering}/>
                            {/* best상품을 렌더링 할 component */}
                        </div>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}

export default React.memo(Home);