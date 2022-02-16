import reactDom from "react-dom";
import React from "react";
import { useBootstrapPrefix } from "react-bootstrap/esm/ThemeProvider";
import { useDispatch } from "react-redux";

const RRTest = ()=>{
    const dispatch = useDispatch(); // action전달, reducer호출
    return(
        <>
        <h4>RRTEST</h4>
        <button  onClick={()=>{
            dispatch({ type:'plus'});
        }}>버튼</button>
        </>
    )
}

export default RRTest