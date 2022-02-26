import axios from "axios";
import { setTotalPage } from "../../redux/pages/actions";
import { useDispatch } from "react-redux";



const GetTotalPage = async (url) =>{
    const dispatch = useDispatch()
    console.log(url , ' getTotalPage 입니다')

    await axios.get('http://127.0.0.1:8081'+url, {
        headers: {
            "Content-Type": "application/json",
        }
    }).then(res => {
        console.log(res.data.totalPages , " getTotalPage 데이터입니다")
        dispatch(setTotalPage(res.data.totalPages))
        // dispatch(addCateItems(res.data))
    }).catch(error => {
        console.log(error, ' getTotalPage 에러');
    })
  }
export default GetTotalPage