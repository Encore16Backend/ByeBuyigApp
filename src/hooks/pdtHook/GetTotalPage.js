import axios from "axios";
import { setTotalPage } from "../../redux/pages/actions";
import { useDispatch } from "react-redux";
import '../../axiosproperties'



const GetTotalPage = async (url) =>{
    const dispatch = useDispatch()

    await axios.get(url, {
        headers: {
            "Content-Type": "application/json",
        }
    }).then(res => {
        dispatch(setTotalPage(res.data.totalPages))
        console.log(res.data , "GetTotalPage")
    }).catch(error => {
        console.log(error, ' getTotalPage 에러');
    })
  }
export default GetTotalPage