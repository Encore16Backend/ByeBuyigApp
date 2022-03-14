import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import '../axiosproperties'

const MyInquiry = ()=>{

    const [pageNo, setPageNo] = useState(1)

    const getMyInquiry = async (pageNo)=>{
        await axios.get('/inquiry/byUsername',{
            params:{
                username : sessionStorage.getItem('id'),
                page : pageNo
            }
    },{
        headers:{
            "Content-Type" : "application/json",
            "Authorization": "Bearer " +sessionStorage.getItem('access_token')
        }
    }).then(res =>{
        console.log(res, "res")
    }).catch(error =>{
        console.log(error.response.data, "getMyInquiry");
        console.log(error.response.status, "getMyInquiry");
        console.log(error.response.headers, "getMyInquiry");
    })
    }

    useEffect(()=>{
        getMyInquiry(pageNo)
    }, [])

    return(
        <div>
            <Container>
                <h1>내 인쿼리</h1>
            </Container>
        </div>
    )
}

export default MyInquiry