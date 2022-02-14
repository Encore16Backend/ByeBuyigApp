import { useEffect, useState } from "react";
import react from "react";
import axios from "axios";

const MyGetAxios = (url)=>{
    const [data, useData] = useState([]);

    useEffect(()=>{
        axios.get('localhost:9999/'+url)
        .then((res)=>{
            useData(res.data);
            console(res.data , "myAxios로 넘어온 데이터")
        })
        .catch((cat)=>{
            console.log("MyGetAxios오류")
        })
    }, [data])
    return data;
}