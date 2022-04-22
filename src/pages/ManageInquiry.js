import React from 'react'
import '../axiosproperties'
import axios from 'axios'
import {useState,useEffect} from 'react'
import {Table,Button,Form, FormControl} from 'react-bootstrap'
import Page from "../components/Base/main/Page";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import MyCalendar from "../components/etc/MyCalendar";
import {AddDays} from '../axiosproperties'


const ManageInquiry =()=>{
    var history = useHistory();
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
    const [startState,setStartState] =useState(false);
    const [checkstate,setCheckstate] =useState(-1);

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
        const newStart = startDate != undefined ? JSON.stringify(startDate).slice(1, 11) : null
        const newEnd = endDate != undefined ? JSON.stringify(endDate).slice(1, 11) : null

        console.log(AddDays(newStart), "Start")
        console.log(AddDays(newEnd), "end")
        
        axios.get('/inquiry/getInquiries',
        {   params :{
                username: searchuser,
                itemname: searchitem,
                chkAnswer:checkstate,
                start:AddDays(newStart),
                end: AddDays(newEnd),
                page:pageNo
            },
            headers:{
                "Content-Type": "application/json",
                "Authorization": "Bearer " + sessionStorage.getItem('access_token'),
            }
        }).then(res=>{
            const data =res.data.content
            console.log(res,"img")
            setAlldata(data)
            setOpenedContentId(-1)
            setTotalPage(res.data.totalPages)
            if(!startState){
                setStartDate()
                setEndDate()
                setStartState(true)
            }
            if (checkstate ===-1){
                setTotalPage(res.data.totalPages)
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
        startpage();
    };
    
    const handlePage = (value) => {
        setPage(value);
    }
    const startpage=()=>{
        if(pageNo!==1){
            setPage(1)
        }
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
                       <Form.Control as="textarea" aria-label="With textarea" value={content.content} 
                       style={{fontSize:"18px"}} rows="3"/>
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
    
    const chkedhandler =(e)=>{
        if(e.target.checked)
            setCheckstate(0)
        else
            setCheckstate(-1)
    }

    const pagereload=()=>{
        setSearchitem('')
        setSearchuser('')
        if(startState){
            setStartDate()
            setEndDate()
            setStartState(true)
        }
    }

    return(
        <>
        <h1 className='centered'> 문의 사항</h1>
        <Form className="review" onSubmit={onSubmit} style={{paddingLeft:"48px"}} >
        <div style={{display:"flex"}}>
                <FormControl type="search" placeholder="ID" className="me-2" aria-label="Search"
                  value={searchuser} onChange={onsearchuser} style={{width:"15%"}}/>&nbsp;
             
                <FormControl type="search" placeholder="상품" className="me-2" aria-label="Search"
                  value={searchitem} onChange={onsearchitem} style={{width:"15%"}}/>&nbsp;
                 <MyCalendar startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate}/>  &nbsp; &nbsp;
                 <input type="checkbox" onChange={chkedhandler} style={{width:"37px",height:"37px"}}/>&nbsp;<h4>답변예정</h4>&nbsp;
             <Button type="submit"style={{width:"70px"}} onClick={getbyusername} >Search</Button>&nbsp;
             <Button style={{width:"70px"}} onClick={pagereload} >Clean</Button>
        </div>
        </Form>

        <div className='userbox'>
        <Table>
        <thead>
            <tr>
                <th style={{width:"10%"}}>작성 날짜</th>
                <th style={{width:"10%"}}>상품 사진</th>
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
                        let pdtImg=data.itemimage
                        let Adata =
                        <>
                        <tr onClick={()=> {
                                if(openedContentId === data.id){
                                    setOpenedContentId(-1);
                                }else{
                                    setOpenedContentId(data.id);
                                    setAdminanswer(init_answer);}}}>

                            <td>{write_date}</td>
                            <td> <img src={`https://byebuying.s3.ap-northeast-2.amazonaws.com/`+pdtImg} style={{padding:0, width:"80px", height:"96px"}}  /></td>
                            <td>{byusername_itemname}</td>
                            <td>{byusername_title}</td>
                            <td>{byusername_name}</td>
                            {/* {answerstate===true ?<td>{answerok === 0 && "답변예정"}</td>
                            :<td>{answerok === 1 ? "답변완료":"답변예정"}</td>} */}
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
                    totalPage !== 0 ? <Page
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