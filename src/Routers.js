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
import ShowOrderResult from "./pages/OrderResult";
import ManageUser from "./pages/ManageUser";
import ManageReview from "./pages/ManageReview";
import ManageComent from "./pages/ManageComent";
import InquiryDetail from "./pages/InquiryDetail";
import MyInquiry from "./pages/MyInquiry";


export default [
    {
        path:'/',
        component:Home
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
        path:"/orderresult",
        component:ShowOrderResult
    },
    {
        path:"/manageuser",
        component:ManageUser
    },
    {
        path:"/managereview",
        component:ManageReview
    },
    {
        path:"/managecoment",
        component:ManageComent
    },
    {
        path:"/inquiryDetail",
        component:InquiryDetail
    },
    {
        path:"/myInquiry",
        component:MyInquiry
    }

]