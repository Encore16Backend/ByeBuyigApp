import axios from "axios";
import { addCateItems } from "../../redux/CateItem/actions";
import { useDispatch } from "react-redux";


const GetCate = async (url) =>{
    const dispatch = useDispatch()
    console.log(url , ' GetCateUrl')

    // /main/category/purchase?category=12

    await axios.get('http://127.0.0.1:8081'+url, {
        headers: {
            "Content-Type": "application/json",
        }
    }).then(res => {
        console.log(res.data , "GetCateData")
        dispatch(addCateItems(res.data))
    }).catch(error => {
        console.log(error, ' GetCate');
    })
  }


export default GetCate