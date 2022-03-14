import React from "react";
import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import '../axiosproperties'
import axios from "axios";

const Managecoment =()=>{
    const [pageNo, setPageNo] = useState(1)

    
    return(
        <div>
            <Container>
                <h1>내 인쿼리</h1>
            </Container>
        </div>
    )
}

export default Managecoment