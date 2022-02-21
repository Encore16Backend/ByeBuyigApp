import axios from "axios";
import { addBestPantsItems } from "../../redux/bestPanteItem/actions";
import { useDispatch } from "react-redux";


const GetBestPants = async (url) =>{
    const dispatch = useDispatch()
    console.log(url , ' bestPants')

    await axios.get('http://127.0.0.1:8081'+url, {
        headers: {
            "Content-Type": "application/json",
        }
    }).then(res => {
        console.log(res.data , " bestPantsRes")
        dispatch(addBestPantsItems(res.data))
    }).catch(error => {
        console.log(error, ' bestPants');
    })
  }


export default GetBestPants