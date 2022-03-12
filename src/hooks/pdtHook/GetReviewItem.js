import axios from "axios";
import { addCateItems } from "../../redux/CateItem/actions";
import { useDispatch } from "react-redux";
import '../../axiosproperties'


const GetReviewItem = async (id) =>{
    const dispatch = useDispatch()
    

    await axios.get(url, {
        headers: {
            "Content-Type": "application/json",
        }
    }).then(res => {
        console.log(res.data.content , "GetReviewItem 데이터입니다")
        // dispatch(addCateItems(res.data.content))
    }).catch(error => {
        console.log(error, ' GetReviewItem 에러');
    })
  }
export default GetReviewItem