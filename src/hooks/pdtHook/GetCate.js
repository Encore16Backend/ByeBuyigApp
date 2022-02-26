import axios from "axios";
import { addCateItems } from "../../redux/CateItem/actions";
import { useDispatch } from "react-redux";


const GetCate = async (url) =>{
    const dispatch = useDispatch()
    console.log(url , ' GetCateUrl 입니다')

    await axios.get('http://127.0.0.1:8081'+url, {
        headers: {
            "Content-Type": "application/json",
        }
    }).then(res => {
        console.log(res.data.content , " GetCateData 데이터입니다")
        dispatch(addCateItems(res.data.content))
    }).catch(error => {
        console.log(error, ' GetCate 에러');
    })
  }
export default GetCate