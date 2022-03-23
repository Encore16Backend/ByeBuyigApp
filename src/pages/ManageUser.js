import React from 'react'
import '../axiosproperties'
import axios from 'axios'
import {useState,useEffect} from 'react'
import {Table,Button} from 'react-bootstrap'
import Page from "../components/Base/main/Page";

const ManageUser =()=>{

    let [totalPageNo, setTotalPageNo] = useState();
    const [Alldata,setAlldata] = useState([]);
    const [pageNo, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState();
    const [loginid,setLoginid]=useState('');
    const [tmprole,setTmprole] = useState('');

    


    // const SelectBox = (role) => {
    //     return (
    //         <select>
    //             {role.options.map((option) => (
    //                 <option
    //                     key={option.value}
    //                     value={option.value}
    //                 >
    //                     {option.name}
    //                 </option>
    //             ))}
    //         </select>
    //     );
    // };


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
            setTotalPage(data.totalPages);
            setAlldata(data.content);
            console.log(data)
            setLoginid(sessionStorage.getItem('id'))
        }).catch(error => {
            console.log(error);
        })
    }, [pageNo])

    const handlePage = (value) => {
        setPage(value);
    }

    const handleChange = (e) => {
        if(e.target.value==="사용자"){
            setTmprole("ROLE_USER")
        }
        else if(e.target.value==="매니저"){
            setTmprole("ROLE_ADMIN")
        }
            console.log(e.target.value);
            console.log(tmprole);
        
    }

    const del =(Ausername)=>{
            axios.delete('/api/user/delete', {
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


    const change_Role=(username)=>{
        axios.post('/api/role/add-to-user',
        {
            userid: username,
            rolename : tmprole,
            
        },{
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + sessionStorage.getItem('access_token'),
            }
        }).then(res=>{
            console.log(res)
            alert("권한이 변경되었습니다")
            window.location.replace("/manageuser")
        }).catch(error=>{
            console.log(error)
            alert("권한이 없습니다.")
            window.location.replace("/manageuser")
        })
    }
    const changeok =(username)=>{
        if(window.confirm("권한을 변경 하시겠습니까?")){
            change_Role(username);
        }
    }

    

    return(
        <>
        <h1 className='centered'> 회원 관리</h1>
        <div className='userbox'>
        <Table >
        <thead>
            <tr>
                <th style={{width:"10%"}}>사용자 이름</th>
                <th style={{width:"15%"}}>이메일</th>
                <th style={{width:"30%"}}>기본 주소</th>
                <th style={{width:"5%"}}>권한</th>
                <th style={{width:"10%"}}>권한 변경</th>
                <th style={{width:"10%"}}>삭제</th>
            </tr>
        </thead>
            <tbody>
                {
                    (Alldata != 0 ) ? Alldata.map((data,idx)=>{
                        let Ausername=data.username
                        let Aemail =data.email
                        let Alocations= !!data.locations ? data.locations :null
                        let basicLocation = !!Alocations[0] ? Alocations[0] : null
                        let BasicAddr = !!basicLocation ? basicLocation.location : null
                        // let BasicAddr;
                        if (BasicAddr)
                            BasicAddr = basicLocation.location.split('/')[0]
                        
                        let basicrole = data.roles.id
                        console.log(basicrole)
                        
                        // const role_arr =[
                        //     { value: 1, name: 1 },
                        //     { value: 3, name: 1 },
                        // ];
                        
                        
                        const role_arr =[];
                        if (basicrole ===1){
                            role_arr.push("사용자")
                            role_arr.push("매니저")
                        }
                        else if(basicrole ===3)
                        {
                            role_arr.push("매니저")
                            role_arr.push("사용자")
                        }
                        else if (basicrole===4)
                        {
                            role_arr.push("관리자")
                        }
                        

                        


                        let Adata =
                        <tr>
                            <td>{Ausername}</td>
                            <td>{Aemail}</td>
                            <td>{BasicAddr}</td>
                            <td>
                            {/* {basicrole ===1 && "사용자"}
                            {basicrole ===3 && "매니저"}
                            {basicrole ===4 && "관리자"} */}
                             <select id='selectbox' style={{height:"38px", width:"112px"}} onChange={handleChange}>
                                {
                                    role_arr.map(name =>((<option key={name} value={name}>{name}</option>)))
                                }
                            </select>
                            
                            </td>
                            {/* <td>{basicrole === 1 ? "사용자":"관리자"}</td>  */}

                            <td>
                                {basicrole ===4 ?<Button style={{width:"130px"}} disabled="true">Super Admin</Button>:
                                <Button style={{width:"100px"}} onClick={()=>changeok(Ausername)}>권한 변경</Button>}
                            </td>
                            {/* <td><Button style={{width:"100px"}} onClick={()=>change_Role(Ausername,"ROLE_ADMIN")}>권한 변경</Button></td> */}
                            <td>{Ausername ===loginid ||basicrole ===4 ? <Button onClick={()=>del(Ausername)} disabled="true" >유저 삭제</Button>:
                            <Button onClick={()=>del(Ausername)}>유저 삭제</Button>}
                            </td>
                            
                        </tr>
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

export default ManageUser