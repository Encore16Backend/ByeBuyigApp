import React from 'react'
import '../axiosproperties'
import axios from 'axios'
import {useState,useEffect} from 'react'
import {Table,Button,Form, FormControl, Row, Col,Accordion} from 'react-bootstrap'
import Page from "../components/Base/main/Page";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const ManageInquiry =()=>{
    var history = useHistory();
    // let [totalPageNo, setTotalPageNo] = useState();
    const [Alldata,setAlldata] = useState([]);
    const [pageNo, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState();
    const [searchuser,setSearchuser] =useState();
    const [searchitem,setSearchitem] =useState();
    const [openedContentId, setOpenedContentId] = useState(-1);
    const [adminanswer,setAdminanswer] = useState('');
    const [searchstate,setSearchstate] =useState(1)


    const onSubmit = (e)=>{
        e.preventDefault();
        history.push({
          pathname: "/ManageInquiry",
          search : "?searchName="+searchuser,
          state: {
            searchuser:searchuser,
          }
      })   
    }

    
    useEffect(()=>{
        console.log("start")
        axios.get('/inquiry/getInquiries',
        {   params :{
                username: searchuser,
                itemname: searchitem,
                page:pageNo
            },
            headers:{
                "Content-Type": "application/json",
                "Authorization": "Bearer " + sessionStorage.getItem('access_token'),
            }
        }).then(res=>{
            const data =res.data.content
            console.log(res)
            setAlldata(data)
            console.log(totalPage)
            setOpenedContentId(-1)
            setTotalPage(res.data.totalPages)
        }).catch(error=>{
            console.log(error)
        })
    },[pageNo, searchstate])



    const onsearchuser=(e)=>{
        setSearchuser(e.target.value)
    }
    const onsearchitem=(e)=>{
        setSearchitem(e.target.value)
    }
    const onadminanswer=(e)=>{
        setAdminanswer(e.target.value)
        console.log(adminanswer)
    }
    
    
    const getbyusername =()=>{
        setSearchstate(searchstate*-1); // 1*-1 = -1 / -1 * -1 -1 , 1
    };
    
    const admin_answer =()=>{
        axios.put('/inquiiry/answer')

    }

    const handlePage = (value) => {
        setPage(value);
    }




    //답변

    const Showcontent =(content)=>{
        if(!content||content === '')
        return <></>
               return(
                   <>
                   <div style={{display:"flex",position:"static"}}>
                       문의 제목 :{content.title}<br></br>
                       문의 내용 :{content.content}
                   </div>
                   </>
               )
           }
    



    return(
        <>
        <h1> 회원 관리</h1>
        <Form className="review" onSubmit={onSubmit} style={{paddingLeft:"48px"}} >
        <div style={{display:"flex"}}>
                <FormControl type="search" placeholder="ID" className="me-2" aria-label="Search"
                  value={searchuser} onChange={onsearchuser} style={{width:"15%"}}/>&nbsp;
             &nbsp;&nbsp;&nbsp;&nbsp;
                <FormControl type="search" placeholder="상품" className="me-2" aria-label="Search"
                  value={searchitem} onChange={onsearchitem} style={{width:"15%"}}/>&nbsp;
             <Button type="submit"style={{width:"70px"}} onClick={getbyusername} >조회</Button>
        </div>
        </Form>

        <div className='userbox'>
        <Table>
        <thead>
            <tr>
                <th style={{width:"30%"}}>상품명</th>
                <th style={{width:"50%"}}>문의사항</th>
                <th style={{width:"10%"}}>작성자</th>
                <th style={{width:"10%"}}>상세내용</th>

            </tr>
        </thead>
            <tbody>
                {
                    (Alldata != 0 ) ? Alldata.map((data,idx)=>{
                        let byusername_name=data.username
                        let byusername_itemname=data.itemname
                        let byusername_title=data.title
                        let byusername_content=data.content
                        let init_answer=data.answer

                        let Adata =
                        <>
                        <tr>
                            <td>{byusername_itemname}</td>
                            <td>{byusername_title}</td>
                            <td>{byusername_name}</td>

                        
                            <td><button onClick={()=> {
                                if(openedContentId === data.id){
                                    setOpenedContentId(-1);
                                }else{
                                    setOpenedContentId(data.id);
                                    setAdminanswer(init_answer);
                                }
                            }}>내용보기</button></td>
                        </tr>
                        {openedContentId === data.id && <tr>
                                <td colSpan={4}>
                                <Showcontent title={byusername_title} content={byusername_content}/>
                                <div>
                                    답변 : <input type="text" value={adminanswer} onChange={onadminanswer}></input>
                                </div>
                                </td>
                            </tr>}
                        </>
                        return (Adata)

                    }):""
                }
            </tbody>
        </Table>
        </div>
        <div className="centered">
                {
                    totalPage != 0 ? <Page
                        setPage={handlePage}
                        totalPage={totalPage}
                        selected={pageNo}
                    /> : ""
                }
            </div>
        </>
    )
}

export default ManageInquiry