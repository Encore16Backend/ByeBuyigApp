import axios from "axios";
import { addCateItems } from "../../redux/CateItem/actions";
import { useDispatch } from "react-redux";
import '../../axiosproperties'



const GetCate = async (url) =>{
    const dispatch = useDispatch()

    await axios.get(url, {
        headers: {
            "Content-Type": "application/json",
        }
    }).then(res => {
        dispatch(addCateItems(res.data.content))
    }).catch(error => {
        console.log(error, ' GetCateData 에러');
    })
  }
export default GetCate