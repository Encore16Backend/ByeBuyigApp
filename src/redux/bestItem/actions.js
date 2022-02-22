import { add_best_items } from './types';
import { add_outer } from './types';
import { add_top } from './types';
import { add_pants } from './types';


// action은 첫글자 소문자
export const addBestItems = (data)=>{
    return{
        type:add_best_items,
        payload:data
    }
}

export const addTop = (data)=>{
    return{
        type:add_top,
        payload:data
    }
}

export const addPants = (data)=>{
    return{
        type:add_pants,
        payload:data
    }
}

export const addOuter = (data)=>{
    return{
        type:add_outer,
        payload:data
    }
}
