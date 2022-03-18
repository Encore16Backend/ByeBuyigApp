import axios from "axios";
import { addMainItems } from "../redux/items/actions";
import { useDispatch } from "react-redux";
import '../axiosproperties'


const GetMainItem = async () =>{
    const dispatch = useDispatch()
    await axios.get('/main/items', {
        headers: {
            "Content-Type": "application/json",
        }
    }).then(res => {
        console.log(res)
       dispatch(addMainItems(res.data))
    }).catch(error => {
        console.log(error.data , "getMainItem error")
        console.log(error, ' getItemLis');
    })
    console.log( "getMainItem 종료")
  }


export default GetMainItem