import { totalPage } from "./types"
import { searchPage } from "./types"

export const setTotalPage = (data)=>{
    return{
        type:totalPage,
        payload:data
    }
}

export const setSearchPage = (data)=>{
    return{
        type:searchPage,
        payload:data
    }
}