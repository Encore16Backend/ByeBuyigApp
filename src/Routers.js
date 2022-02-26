import Home from "./pages/Home";
import MyPage from "./pages/MyPage";
import Check from "./pages/Check";
import Update from "./pages/Update";


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
        path: '/Check',
        component : Check
    },
    {
        path : '/Update',
        component : Update
    }
]