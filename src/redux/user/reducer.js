import { LogIn } from "./types"
import { LogOut } from "./types"


const initState = {
    ID : '',
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
        default : return state
    }
}

export default userReducer