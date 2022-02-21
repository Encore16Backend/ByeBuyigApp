import axios from "axios";
import { addBestOuterItems } from "../../redux/bestOuterItem/actions";
import { useDispatch } from "react-redux";


const GetBestOuter = async (url) =>{
    const dispatch = useDispatch()
    console.log(url , ' bestOuter')

    await axios.get('http://127.0.0.1:8081'+url, {
        headers: {
            "Content-Type": "application/json",
        }
    }).then(res => {
        console.log(res.data , " bestOuterRes")
        dispatch(addBestOuterItems(res.data))
    }).catch(error => {
        console.log(error, ' bestOuter');
    })
  }


export default GetBestOuter