import axios from "axios";
import { addBestItems } from "../redux/bestItem/actions"
import { addTop } from "../redux/bestItem/actions";
import { addOuter } from "../redux/bestItem/actions";
import { addPants } from "../redux/bestItem/actions";
import { useDispatch } from "react-redux";


const GetBestItems = async (url) =>{
    const dispatch = useDispatch()
    await axios.get('http://127.0.0.1:8081'+url, {
        headers: {
            "Content-Type": "application/json",
        }
    }).then(res => {
        let temp = Object.entries(res.data) // 4개의 배열로 나눈다
        let all = temp[0] // all
        let top = temp[1] // top
        let outer = temp[3] // bottom
        let pants = temp[2] // outer
        dispatch(addBestItems(all[1]))
        dispatch(addTop(top[1]))
        dispatch(addOuter(outer[1]))
        dispatch(addPants(pants[1]))

    }).catch(error => {
        console.log(error, ' bestItem error');
    })
    
  }


export default GetBestItems