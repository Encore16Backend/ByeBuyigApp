import axios from "axios";
import { addCateItems } from "../../redux/CateItem/actions";
import { useDispatch } from "react-redux";


const GetReviewItem = async (id) =>{
    const dispatch = useDispatch()
    console.log(id , ' GetReviewItemID 입니다')

    await axios.get('http://127.0.0.1:8081'+url, {
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