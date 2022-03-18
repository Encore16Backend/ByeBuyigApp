import React from 'react'
import '../axiosproperties'
import axios from 'axios'
import {useState,useEffect} from 'react'
import {Table,Button,Form, FormControl, Row, Col,Accordion, FormCheck} from 'react-bootstrap'
import Page from "../components/Base/main/Page";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import MyCalendar from "../components/etc/MyCalendar";


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
    // const [startDate, setStartDate] = useState(new Date('2022-01-01'));
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [startState,setStartState] =useState(false)



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
        console.log(startDate, endDate);
        const newStart = startDate != undefined ? JSON.stringify(startDate).slice(1, 11) : null
        const newEnd = endDate != undefined ? JSON.stringify(endDate).slice(1, 11) : null
        axios.get('/inquiry/getInquiries',
        {   params :{
                username: searchuser,
                itemname: searchitem,
                start :newStart,
                end: newEnd,
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
            setOpenedContentId(-1)
            setTotalPage(res.data.totalPages)
            if(!startState){
                console.log("1")
                setStartDate()
                setEndDate()
                setStartState(true)
            }
           
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
    }
    
    
    const getbyusername =()=>{
        setSearchstate(searchstate*-1); // 1*-1 = -1 / -1 * -1 -1 , 1
        // setStartDate(startDate)
        // setPage(1)
    };
    
    
    const handlePage = (value) => {
        setPage(value);
    }
    



    //답변
    const Showcontent =(content)=>{
        if(!content||content === '')
        return <></>
               return(
                   <>
                   {/* <div style={{display:"flex",position:"static"}}> */}
                   <div >
                       <h5>문의 내용 </h5>
                        
                       <br/>
                       <Form.Control as="textarea" aria-label="With textarea" value={content.content} style={{fontSize:"18px"}} rows="3"/>
                       <br/>
                   </div>
                   </>
               )
           }
    const admin_answer = (id,answer) =>{
        axios.put('/inquiry/answer',{
            id: id,
            answer : answer
        },{
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + sessionStorage.getItem('access_token'),
        }
            
        }).then(res => {
            console.log(res)
        }).catch(error => {
            console.log(error)
        })
    }
    



    return(
        <>
        <h1> 회원 관리</h1>
        <Form className="review" onSubmit={onSubmit} style={{paddingLeft:"48px"}} >
        <div style={{display:"flex"}}>
                <FormControl type="search" placeholder="ID" className="me-2" aria-label="Search"
                  value={searchuser} onChange={onsearchuser} style={{width:"15%"}}/>&nbsp;
             
                <FormControl type="search" placeholder="상품" className="me-2" aria-label="Search"
                  value={searchitem} onChange={onsearchitem} style={{width:"15%"}}/>&nbsp;
                 <MyCalendar startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate}/>  &nbsp; &nbsp;
             <Button type="submit"style={{width:"70px"}} onClick={getbyusername} >조회</Button>
        </div>
        </Form>

        <div className='userbox'>
        <Table>
        <thead>
            <tr>
                <th style={{width:"10%"}}>작성 날짜</th>
                <th style={{width:"30%"}}>상품명</th>
                <th style={{width:"15%"}}>제목 </th>
                <th style={{width:"10%"}}>작성자</th>
                <th style={{width:"10%"}}>답변유무</th>

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
                        let write_date = data.date
                        let answerok = data.chkanswer

                        let Adata =
                        <>
                        <tr onClick={()=> {
                                if(openedContentId === data.id){
                                    setOpenedContentId(-1);
                                }else{
                                    setOpenedContentId(data.id);
                                    setAdminanswer(init_answer);}}}>

                            <td>{write_date}</td>
                            <td>{byusername_itemname}</td>
                            <td>{byusername_title}</td>
                            <td>{byusername_name}</td>
                            <td>{answerok === 1 ? "답변완료":"답변예정"}</td>
                            
                        
                        
                        </tr>
                        {openedContentId === data.id && <tr>
                                <td colSpan={5}>
                                <Showcontent content={byusername_content}/>
                                <div>
                                    <form>
                                    <h5>답변</h5>
                                    <br></br>
                                    <Form.Control placeholder="내용을 입력하세요"  as="textarea" aria-label="With textarea" style={{fontSize:"18px"}}
                                    value={adminanswer} onChange={onadminanswer} rows="5"/>
                                    <br/>
                                    <Button type="submit" onClick={()=>admin_answer(data.id,adminanswer)}>답변등록</Button>
                                    </form>
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