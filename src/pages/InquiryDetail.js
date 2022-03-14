import React from "react";
import { Container, Table } from "react-bootstrap";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

const InquiryDetail = ()=>{

    const location = useLocation()
    const Q = location.state
    console.log(Q, "DetailQ")

    return(
        <div>
            <Container>
                <br/>
                
                <br/><br/>
                <Table>
                    <thead >
                        <tr>
                            <td>{Q.title}</td>
                            <td style={{textAlign:"center"}} >작성날짜 &nbsp;&nbsp; {Q.date}</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style={{height:"400px"}}>
                            <td colSpan={2}>{Q.content}</td>
                        </tr>
                        <tr style={{height:"200px"}}>
                            <td colSpan={2}>{Q.answer != "" ? Q.answer : "답변예정입니다"}</td>
                        </tr>
                    </tbody>
                </Table>
            </Container>
        </div>
    )
}

export default InquiryDetail