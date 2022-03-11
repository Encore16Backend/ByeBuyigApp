import { add_location1 } from "./types"
import { add_location2 } from "./types"
import { add_location3 } from "./types"


export const addLoc1 = (data)=>{
    return{
        type:add_location1,
        payload:data
    }
}
export const addLoc2 = (data)=>{
    return{
        type:add_location2,
        payload:data
    }
}
export const addLoc3 = (data)=>{
    return{
        type:add_location3,
        payload:data
    }
}
