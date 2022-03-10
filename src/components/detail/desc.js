import React, { useDebugValue, useState } from "react";
import { Button, InputGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import ReactStars from "react-stars"
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import postRefresh from "../../hooks/postRefresh"
import "../../css/desc.css"
import BeforeOrder from "../../modals/BeforeOrder";
import session from "redux-persist/lib/storage/session";

const DetailDesc = ({pdtState, lendering, setLandering})=>{

    const history = useHistory();
     // 들어온 카테고리의 상세 품목 길이
    // const allItem = useSelector(state => state.Item.items)

    // 해당 페이지 받아오기
    const oneItem = useSelector(state=>state.oneItem.item)
    console.log(oneItem , "one")
    const [modalOn, setModalOn] = useState(false)
    const [forOrder,setForOrder] = useState([])

    
    const imgArr = oneItem.images ? oneItem.images : []
    const temp = imgArr[0] ? imgArr[0] : [] 
    const img1 = temp.imgpath ? temp.imgpath : ""
    

    const [bcount, setBcount] = useState(1);
    
    const decreaseNum = ()=>{
        const Upbcount = bcount + 1
        setBcount(Upbcount)
    }

    const increaseNum = ()=>{
        const Downbcount = bcount - 1
        if (Downbcount < 1) {
            Downbcount = 0
        }
        setBcount(Downbcount)
    }


    // 장바구니에 담는 함수
    const addBasket = async (username,itemid,itemimg,itemname,itemprice,bcount)=>{
        await axios.post('http://127.0.0.1:8081/basket/add',{
            // body
            username : username,
            itemid : itemid,
            itemimg : itemimg,
            itemname : itemname,
            itemprice : itemprice,
            bcount : bcount
        },{
            // header
            headers:{
                "Content-Type": "application/json",
                "Authorization": "Bearer " + sessionStorage.getItem('access_token')
            }
        }).then(res =>{
            setLandering(!lendering)
            if (window.confirm('장바구니에 담겼습니다 장바구니로 이동하시겠습니까')){
                history.push({
                    pathname : "/basket",
                    
                })
            }

        }).catch(error =>{
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            postRefresh() // 토큰이 없으면 재발행시키는 함수
            addBasket(username,itemid,itemimg,itemname,itemprice) //  토큰을 받고 실행하고 싶은 함수 다시 실행
        })
    }

// categories: (2) [{…}, {…}]
// count: 200
// images: (3) [{…}, {…}, {…}]
// itemid: 3
// itemname: "CONA 9154 기모옵션추가 커버밴드 와이드 루즈 데미지워싱 데님 블랙그레이"
// price: 48600
// purchasecnt: 0
// reviewcount: 4
// reviewmean: 4.25

    // const order = {
    //     "username": sessionStorage.getItem("id"),
    //     "itemid":oneItem.itemid,
    //     "itemname":oneItem.itemname,
    //     "itemprice":oneItem.price,
    //     "itemimg":oneItem.images[0].imgpath,
    //     "bcount":bcount
    // }
    // setForOrder(...forOrder, order)

    // 구매요청 단일 품목
    const makeOrder = async ()=>{
        window.confirm("정말 구매하시겠습니까?")
       

        await axios.post("http://127.0.0.1:8081/orderHistory/add",{
            // body ,2번째 괄호
            OrderHistory:forOrder
        },{
            // header ,3번째 괄호
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + sessionStorage.getItem('access_token')
            },
        }).then(res => {
            const data = res.data
            setModalOn(false)
            history.push({
                pathname:"/orderresult",
                state : forOrder
            })

        }).catch(error => {
            console.log(error, ' makeOrder 에러');
        })
    }

    
    
    // const render = allItem.filter(item => item.itemid === itemid)
    // const renderedItem = render[0] ? render[0] : ""

    const rendering = ()=>{
        return(
            <>
        <div>
            <h1>Product Info</h1>
            <br/><br/>
            <p> 상품명/품번 : <b>{oneItem.itemname}/{oneItem.itemid}</b> </p>
            <div className="descStar">
                <div>평점 : {oneItem.reviewmean} </div>
                <div><ReactStars edit={false} value={oneItem.reviewmean}/></div>
            </div>
            <p> 가격 : <b>{oneItem.price}</b> </p>
            <p> 구매수 : <b>{oneItem.purchasecnt}</b> </p>
            <p> 리뷰 수 : {oneItem.reviewcount}</p>
            {/* username,itemid,itemimg,itemname,itemprice,bcount*/}
            {/* 장바구니 주문 갯수 정하기 */}
            <div>
                <form>
                <div class="value-button" id="decrease" onClick={increaseNum} value="Decrease Value"><div className="plusminus">-</div></div>
                    <input type="number" id="number" value={bcount}/>
                <div class="value-button" id="increase" onClick={decreaseNum} value="Increase Value"> <div className="plusminus">+</div></div>
                </form>
            </div>
            {/* 모달창 */}
            <BeforeOrder makeOrder={makeOrder} orderItems={forOrder} show={modalOn} onHide = {()=>{setModalOn(false)}} />

            {/* 장바구니 담기 버튼 */}
            <Button onClick={() => addBasket(
                sessionStorage.getItem("id") , oneItem.itemid, img1, oneItem.itemname, oneItem.price,bcount
            )}>장바구니 담기</Button>
            <Button onClick={()=>{
                
                setModalOn(true)
            }}>
                즉시구매
            </Button>
        </div>
            </>
        )
    }
    
    

    return(
        <> 
        {
            (!!oneItem) ? rendering() : ""
        }
            
        </>
    )
}

export default DetailDesc