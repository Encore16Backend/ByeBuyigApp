import React from 'react'
import '../axiosproperties'
import axios from 'axios'
import {useState,useEffect} from 'react'
import {Table,Button} from 'react-bootstrap'
import Page from "../components/Base/main/Page";

const ManageUser =()=>{

    let [totalPageNo, setTotalPageNo] = useState();
    const [Alldata,setAlldata] = useState([])
    const [pageNo, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState()

    useEffect(() => {
        axios.get('/api/users', {
            params: {
                page: pageNo
            },
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + sessionStorage.getItem('access_token')
            },
        }).then(res => {
            const data = res.data
            setTotalPage(data.totalPage);
            setAlldata(data.content);
        }).catch(error => {
            console.log(error);
        })
    }, [pageNo])

    const handlePage = (value) => {
        setPage(value);
    }


    // 유저 네임을 받는
    



    return(
        <>
        <h1> 회원 관리</h1>
        <div className='userbox'>
        <Table >
        <thead>
            <tr>
                <th style={{width:"10%"}}>사용자 이름</th>
                <th style={{width:"30%"}}>이메일</th>
                <th style={{width:"50%"}}>기본 주소</th>
            </tr>
        </thead>
            <tbody>
                {
                    (Alldata != 0 ) ? Alldata.map((data,idx)=>{
                        let Ausername=data.username
                        let Aemail =data.email
                        let Alocations= !!data.locations ? data.locations :null
                        let basicLocation = !!Alocations[0] ? Alocations[0] : null
                        // let BasicAddr = !!basicLocation ? basicLocation.location : null
                        let BasicAddr;
                        if (BasicAddr)
                            BasicAddr = basicLocation.location.split('/')[0]
                        
                        const del = async (e)=>{
                            await axios.delete('/api/user/delete', {
                                params :{
                                    username: Ausername
                                }
                            }, {
                                headers: {
                                    "Content-Type": "application/json",
                                    "Authorization": "Bearer " + sessionStorage.getItem('access_token'),
                                },
                            }).then(res => {
                                alert("삭제되었습니다.")
                                window.location.replace("manageuser")
                            }).catch(error => {
                            })
                        };

                        


                        let Adata =
                        <tr>
                            <td>{Ausername}</td>
                            <td>{Aemail}</td>
                            <td>{BasicAddr}</td>
                            <td><Button onClick={del}>유저 삭제</Button></td>
                            
                        </tr>
                        return (Adata)

                    }):""
                }
            </tbody>
        </Table>
        </div>
        <div className="centered">
                {
                    totalPageNo != 0 ? <Page
                        setPage={handlePage}
                        totalPage={totalPageNo}
                        selected={pageNo}
                    /> : ""
                }
            </div>
        </>
    )
    }

export default ManageUser