import axios from "axios";
import { addCateItems } from "../../redux/CateItem/actions";
import { useDispatch } from "react-redux";



const GetCate = async (url) =>{
    const dispatch = useDispatch()

    await axios.get('http://127.0.0.1:8081'+url, {
        headers: {
            "Content-Type": "application/json",
        }
    }).then(res => {
        dispatch(addCateItems(res.data.content))
        console.log(res.data, "GetCate")
    }).catch(error => {
        console.log(error, ' GetCateData 에러');
    })
  }
export default GetCate