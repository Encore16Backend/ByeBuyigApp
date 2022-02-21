import React from "react";
import GetMainItem from "../hooks/GetMainItems";

const Wrapper = ()=>{

    //  뿌려주는 값들을 받아오기 위한 컴포넌트 최초렌더링 시 redux넣기 위한 컴포넌트
    GetMainItem()

    return(
        <>
        
        </>
    )
}

export default Wrapper