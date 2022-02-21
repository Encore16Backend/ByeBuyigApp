import axios from "axios";
import { addBestTopItems } from "../../redux/bestTopItem/actions";
import { useDispatch } from "react-redux";


const GetBestTop = async (url) =>{
    const dispatch = useDispatch()
    console.log(url , ' bestTop')

    await axios.get('http://127.0.0.1:8081'+url, {
        headers: {
            "Content-Type": "application/json",
        }
    }).then(res => {
        console.log(res.data , " BestTopRes")
        dispatch(addBestTopItems(res.data))
    }).catch(error => {
        console.log(error, ' BestTop');
    })
  }


export default GetBestTop