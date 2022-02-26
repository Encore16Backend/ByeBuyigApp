import { useEffect, useState } from "react";
import { Modal, Button, Form} from "react-bootstrap";
import axios from "axios";
import postRefresh from "../hooks/postRefresh";
import { BrowserRouter as Router, Switch, Route,Link
} from 'react-router-dom';
import MyPage from "./MyPage";
import React from 'react';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";


const Update= () => {
    

    var history=useHistory();

    const data = useLocation();
    // const id = localStorage.getItem('id');
    let [email, setEmail] = useState('');
    let [location, setLocation] = useState('');
    let [style, setStyle] = useState('');
    
    useEffect(() => {
        axios.post('http://127.0.0.1:8081/api/user/getUser', {
            username: sessionStorage.getItem('id'),
            password:data.state.pwd
        }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + sessionStorage.getItem('access_token'),
            },
        }).then(res => {
            setEmail(res.data.email);
            setLocation(res.data.location);
            setStyle(res.data.style);
            // history.push({
            //     pathname: "/update/",
            //     state: {
            //         pwd:pwd
            //         // id : res.data.username,
            //         // email: res.data.email,
            //         // location: res.data.location,
            //         // style: res.data.style
            //     }
            // })   
        }).catch(error => {
            history.push("/")
        })
    }, [])
    // const [location,setLoction] = useState(data.state.location)
    // const [email,setEmail] = useState(data.state.email)
    // const [style,setStyle] = useState(data.state.style)
    // const [location,setLoction] = useState(data.state.location)
    // const [email,setEmail] = useState(data.state.email)
    // const [style,setStyle] = useState(data.state.style)
    // const [location,setLoction] = useState(data.state.location)
    // const [email,setEmail] = useState(data.state.email)
    // const [style,setStyle] = useState(data.state.style)
    // const [location,setLoction] = useState(data.state.location)
    // const [email,setEmail] = useState(data.state.email)
    // const [style,setStyle] = useState(data.state.style)
    // const [location,setLoction] = useState(data.state.location)
    // const [email,setEmail] = useState(data.state.email)
    // const [style,setStyle] = useState(data.state.style)
    // const [location,setLoction] = useState(data.state.location)
    // const [email,setEmail] = useState(data.state.email)
    // const [style,setStyle] = useState(data.state.style)// const [location,setLoction] = useState(data.state.location)
    // const [email,setEmail] = useState(data.state.email)
    // const [style,setStyle] = useState(data.state.style)
    // const [location,setLoction] = useState(data.state.location)
    // const [email,setEmail] = useState(data.state.email)
    // const [style,setStyle] = useState(data.state.style)
    // const [location,setLoction] = useState(data.state.location)
    // const [email,setEmail] = useState(data.state.email)
    // const [style,setStyle] = useState(data.state.style)
    // const [location,setLoction] = useState(data.state.location)
    // const [email,setEmail] = useState(data.state.email)
    // const [style,setStyle] = useState(data.state.style)
    // const [location,setLoction] = useState(data.state.location)
    // const [email,setEmail] = useState(data.state.email)
    // const [style,setStyle] = useState(data.state.style)
    // const [location,setLoction] = useState(data.state.location)
    // const [email,setEmail] = useState(data.state.email)
    // const [style,setStyle] = useState(data.state.style)
    // const [location,setLoction] = useState(data.state.location)
    // const [email,setEmail] = useState(data.state.email)
    // const [style,setStyle] = useState(data.state.style)
    // const [location,setLoction] = useState(data.state.location)
    // const [email,setEmail] = useState(data.state.email)
    // const [style,setStyle] = useState(data.state.style)
    // const [location,setLoction] = useState(data.state.location)
    // const [email,setEmail] = useState(data.state.email)
    // const [style,setStyle] = useState(data.state.style)
    // const [email,setEmail] = useState(data.state.email)
    // const [style,setStyle] = useState(data.state.style)






    const onLoctionChange = (e) => {
        setLocation(e.target.value);
    };
    const onEmailChange = (e) => {
        setEmail(e.target.value);
    };
    const onstlyeChange = (e) => {
        setStyle(e.target.value);
    };

    
    const del = async (e)=>{
        e.preventDefault();
        await axios.delete('http://127.0.0.1:8081/api/user/delete', {
            params :{
                username: sessionStorage.getItem('id')
            }

        }, {
            headers: {
                "Content-Type": "application/json",
                //"Authorization": "Bearer " + localStorage.getItem('access_token'),
            },
        }).then(res => {
            alert('삭제성공')
            sessionStorage.removeItem('id');
            sessionStorage.removeItem('access_token')
            sessionStorage.removeItem('refresh_token')
            window.location.replace("/")

        }).catch(error => {
            alert("비밀번호를 확인해주세요.");
        })
    };



    const update = async (e)=>{
        e.preventDefault();
        await axios.put('http://127.0.0.1:8081/api/user/update', {
            username: sessionStorage.getItem('id'),
            location : location,
            style : style,
            email : email

        }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + sessionStorage.getItem('access_token'),
            },
        }).then(res => {
            alert('정보수정 성공')
        }).catch(error => {
            alert("비밀번호를 확인해주세요.");
        })
    };

    return(
        <>
        <div>
            id : {localStorage.getItem('id')} <br></br>
            주소 :<input onChange={onLoctionChange} value={location}></input> <br></br>
            이메일 : <input onChange={onEmailChange} value={email}></input> <br></br>
            스타일 : <input onChange={onstlyeChange} value={style}></input> <br></br>
            <button onClick={update}>수정</button>
            <button onClick={del}>삭제</button>
        </div>
        </>
    )
}
export default Update;