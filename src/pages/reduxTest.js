import React from "react";
import { useSelector } from "react-redux";
import RRTest from "./reduxTestFunc";

const RTest = ()=>{
    const RFunc = (state)=>{
        return state.number
    }
    const number = useSelector(RFunc); 
    // 함수값을 인자로 받음 ()이거 쓰면안댐 인자로 받으니까
    return(
        <>
        <h2>Test {number}</h2>
        <RRTest/>
        </>
    )
}

export default RTest