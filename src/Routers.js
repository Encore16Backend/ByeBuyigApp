import CateList from "./pages/CateList";
import DetailPage from "./pages/DetailPage";
import Home from "./pages/Home";
import Review from "./pages/Review";
import Update from "./pages/Update";
import SearchList from "./pages/SearchPage";
import ImgSearchPage from "./pages/ImgSearchPage";
import MyReview from "./pages/MyReview";
import ShoppingBasket from "./pages/ShoppingBasket";
import Order from "./pages/Order";
import BeforeOrder from "./pages/BeforeOrder";
import ShowOrderResult from "./pages/OrderResult";

export default [
    {
        path:'/',
        component : Home
    },
    {
        path:'/Review',
        component:Review
    },
    {
        path : '/Update',
        component : Update
    },
    {
        path:'/category',
        component:CateList
    },
    {
        path:'/detail', // 쿼리 사용시에는 경로에 적을 필요없음
        component : DetailPage
    },
    {
        path:'/searchlist',
        component:SearchList
    },
    {
        path:"/imgsearch",
        component:ImgSearchPage
    },
    {
        path:"/myReview",
        component:MyReview
    },
    {
        path:"/basket",
        component:ShoppingBasket
    },
    {
        path:"/order",
        component:Order
    },
    {
        path:"/beforeorder",
        component:BeforeOrder
    },
    {
        path:"/orderresult",
        component:ShowOrderResult
    }
]