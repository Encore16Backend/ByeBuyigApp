import { totalPage } from "./types"

export const setTotalPage = (data)=>{
    return{
        type:totalPage,
        payload:data
    }
}
