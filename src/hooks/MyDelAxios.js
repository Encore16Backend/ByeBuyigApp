import { useEffect, useState } from "react";
import axios from "axios";

const MyDelAxios = ({url}, {Deldata})=>{
    const [data, useData] = useState([]);

    useEffect(()=>{
        axios.delete('localhost:9999/'+url+"/"+Deldata)
        .then((res)=>{
            console(res, "MyDelAxios로 삭제")
        })
        .catch((cat)=>{
            console.log("MyGetAxios 오류")
        })
    }, [Deldata])
}