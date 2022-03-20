import React from 'react'
import '../axiosproperties'
import axios from 'axios'
import {useState,useEffect} from 'react'
import {Table,Button,Form, FormControl, Row, Col,Accordion, FormCheck} from 'react-bootstrap'
import Page from "../components/Base/main/Page";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import MyCalendar from "../components/etc/MyCalendar";


const Managereview =()=>{
    var history = useHistory();
    // let [totalPageNo, setTotalPageNo] = useState();
    const [Alldata,setAlldata] = useState([]);
    const [pageNo, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState();
    const [searchuser,setSearchuser] =useState();
    const [searchitem,setSearchitem] =useState();
    const [openedContentId, setOpenedContentId] = useState(-1);
    const [searchstate,setSearchstate] =useState(1)
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [startState,setStartState] =useState(false);
    const [checkReviews, setCheckReviews] = useState([]);
    const [checkItems, setCheckItems] = useState([]);


    const onSubmit = (e)=>{
        e.preventDefault();
        history.push({
          pathname: "/ManageReview",
          search : "?searchName="+searchuser,
          state: {
            searchuser:searchuser,
          }
      })   
    }

    
    useEffect(()=>{
        console.log("start")
        const newStart = startDate != undefined ? JSON.stringify(startDate).slice(1, 11) : null
        const newEnd = endDate != undefined ? JSON.stringify(endDate).slice(1, 11) : null
        axios.get('/review/getReviews',
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
    
    const getbyusername =()=>{
        setSearchstate(searchstate*-1); // 1*-1 = -1 / -1 * -1 -1 , 1
    };
    
    
    const handlePage = (value) => {
        setPage(value);
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

    const delreview =  () => {
        axios.delete("/review/delete", {
            params: {
                reviewid:checkReviews,
                itemid:checkItems
            },
        }).then(res => {
            if (res === "FAIL") {
                alert("리뷰 삭제 실패");
            }
            setCheckReviews([]);
            setCheckItems([]);
        }).catch(err => {
            console.log(err)
        }) 
    }
    

    return(
        <>
        <h1> 리뷰 관리</h1>
        <Button className="remove" variant="secondary" size="sm" onClick={delreview}>삭제</Button>
        <Form className="review" onSubmit={onSubmit} style={{paddingLeft:"48px"}} >
        <div style={{display:"flex"}}>
                <FormControl type="search" placeholder="ID" className="me-2" aria-label="Search"
                  value={searchuser} onChange={onsearchuser} style={{width:"15%"}}/>&nbsp;
             
                <FormControl type="search" placeholder="상품" className="me-2" aria-label="Search"
                  value={searchitem} onChange={onsearchitem} style={{width:"15%"}}/>&nbsp;
                 <MyCalendar startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate}/>  &nbsp; &nbsp;
             <Button type="submit"style={{width:"70px"}} onClick={getbyusername} >조회</Button>&nbsp;
             <Button style={{width:"75px"}} onClick={pagereload} >비우기</Button>
        </div>
        </Form>

        <div className='userbox'>
        <Table>
        <thead>
            <tr>
                <th style={{width:"10%"}}>작성 날짜</th>
                <th style={{width:"10%"}}>상품 사진 </th>
                <th style={{width:"30%"}}>상품명</th>
                <th style={{width:"30%"}}>후기</th>
                <th style={{width:"15%"}}>작성자 </th>

            </tr>
        </thead>
            <tbody>
                {
                    (Alldata != 0 ) ? Alldata.map((data,idx)=>{
                        let byusername_name=[data.username]
                        let byusername_itemname=[data.itemname]
                        let byusername_content=data.content
                        let write_date = data.date
                        let pdtImg=data.itemimage
                        let Adata =
                        <>
                        <tr>
                            <td>{write_date}</td>
                            <td> <img src={pdtImg} width="80" height="96"/></td>
                            <td>{byusername_itemname}</td>
                            <td>{byusername_content}</td>
                            <td>{byusername_name}</td>
                        
                        </tr>
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

export default Managereview