import { LogIn } from "./types"
import { LogOut } from "./types"
import { setPwd } from "./types"


const initState = {
    ID : '',
    pwd : '',
    location:'',
    username:'',
    style:'',
    email:'',
    role:'',
    zzim : [], // 찜목록

}
const userReducer = (state=initState, action)=>{
    switch(action.type){
        case LogIn : 
            return{
                ...state,
                ID : action.payload
            }
        case LogOut :
            return{
                ID : '',
                location:'',
                style:'',
                email:'',
                role:''
            }
        case setPwd : 
            return{
                ...state,
                pwd : action.payload
            }
        
        default : return state
    }
}

export default userReducer