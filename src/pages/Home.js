import React, { useCallback, useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import BestCardWrapper from "../components/Base/main/BestCarpWrapper";
import GetBestItems from "../hooks/GetBestItems";

console.log('wtf');
const Home = ()=>{
    const [Homelendering , setHomeLandering] = useState(false);
    // 베스트 아이템들 url을 변경하기 위한 state
    const [BestItemUrl , setBestItemUrl] = useState('/main/bestItem');

    console.log("home url 요청 전");    
    // 베스트 아이템들 (기본 url 후기Best) 전체 Best
    GetBestItems(BestItemUrl);

    console.log("home url 요청 후");    

    return(
        <Container className="pdtContainer centered" style={{width: "auto"}} >
            <Row>
                <Col>
                    <Row>
                        <br/><br/><br/><br/>
                        <div className="bestpdts">
                            <BestCardWrapper cata = {"bestPdt"} setHomeLandering={setHomeLandering} HomeLandering={Homelendering}/>
                        </div>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}

export default React.memo(Home);