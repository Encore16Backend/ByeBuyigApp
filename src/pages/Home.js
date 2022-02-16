import react from "react";
import { createStore } from 'redux';
import {Provider, useSelector, useDispatch, connect} from
'react-redux'
import Test from "../components/auth/Test";
import RTest from "./reduxTest";


// Provider state들을 어떤 컴토넌트에 제공할것인가
function reducer(currentState, action){ // 현재값, 어떻게 바꿀것인지
  if (currentState === undefined){
    return{
      number : 1,
    }
  }
  const newState = {...currentState}
  if (action.type === 'plus'){ // action
    newState.number++;
    }
  return newState
}
const store = createStore(reducer);
// redux사용시 사용되는 컴포넌트들만 렌더링됨



const Home = ()=>{
    return(
        <Provider store={store}>
        <h1>Home</h1>
        <RTest/>
        </Provider>
    )
}


export default Home;