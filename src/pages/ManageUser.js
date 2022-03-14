import '../axiosproperties'
import axios from 'axios'
import {useState,useEffect} from 'react'
import {Table} from 'react-bootstrap'


const ManageUser =()=>{


    const [Alldata,setAlldata] = useState([])
    const [Alllocation,setAlllocation] =useState([])

    useEffect(() => {
        axios.get('/api/users'
       , {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + sessionStorage.getItem('access_token')
            },
        }).then(res => {
            const data = res.data
            const locationdata =res.data[7].locations[0]

            setAlldata(data)
            setAlllocation(locationdata)
        }).catch(error => {
            console.log(error);
        })
    }, [])

    return(
        <>
        회원 관리
        <Table>
        <thead>
            <tr>
                <th>사용자 이름</th>
                <th>이메일</th>
                <th>주소</th>
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
                        
                        let Adata =
                        <tr>
                            <td>{Ausername}</td>
                            <td>{Aemail}</td>
                            <td>{BasicAddr}</td>
                            
                        </tr>
                        return (Adata)

                    }):""
                }
            </tbody>
        </Table>
        
        </>
    )
    }

export default ManageUser