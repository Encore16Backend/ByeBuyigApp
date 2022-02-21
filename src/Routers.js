import CateList from "./pages/CateList";
import Home from "./pages/Home";
import MyPage from "./pages/MyPage";

export default [
    {
        path:'/',
        component : Home
    },
    {
        path:'/mypage',
        component:MyPage
    },
    {
        path:'/category',
        component:CateList
    }
]