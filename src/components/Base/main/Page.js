import React from "react";

const Page = ({setPage, totalPage, selected, reviewNum})=>{
    
    if (reviewNum ){
        totalPage = Math.ceil(reviewNum/5)
    }

    // 화면에 보여질 페이지
    // 화면에 보여질 마지막 페이지 (화면에 보여질 페이지 그룹*한 화면에 나타낼 페이지)
    // const lastPage = pageGroup*showedPage
    const lastPage = (selected + 2 >= totalPage) ? totalPage : (selected + 2 <= 5 ? (totalPage == 4 ? 4 : 5) : (selected + 2))
    // 화면에 보여질 첫 페이지 (한화면에 나올 페이지 -1)
    // const firstPage = lastPage - (showedPage - 1)
    const firstPage = (selected-2 <= 1) ? 1 : ( lastPage === totalPage ? (totalPage - 4 == 0 ? 1 : totalPage-4): selected-2 )

    // 배열생성2
    const newArr = []
    for (let i = firstPage; i<=lastPage; i++){
        newArr.push(i)
    }

    return(
        <div className="myPage">
            <ul>
                <li style={{display:"inline-block", paddingRight:"1rem"}} onClick={()=>{setPage(1)}} > 처음으로 </li>
            {
                newArr.map(page=>{
                    // 페이지 변경함수
                    let Func = ()=>{setPage(page)}
                    if (page === selected){
                        page = <b>{page}</b>
                        Func = ()=>{
                        }
                    }
                    return(
                        <li key={page} style={{display:"inline-block", paddingRight:"1rem"}} onClick={Func} value={page}>{page}</li>
                    )
                })
            }
                <li style={{display:"inline-block", paddingRight:"1rem"}} onClick={()=>{setPage(totalPage)}}> 마지막 </li>
            </ul>
        </div>
    )
}

export default Page