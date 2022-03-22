import React, { useDebugValue, useState } from "react";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import ReactStars from "react-stars"
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import postRefresh from "../../hooks/postRefresh"
import "../../css/desc.css"
import BeforeOrder from "../../modals/BeforeOrder";
import "../../axiosproperties"
import {getStringPrice} from "../../axiosproperties";

const DetailDesc = ({ lendering, setLandering})=>{

    const history = useHistory();

    // 해당 페이지 받아오기
    const oneItem = useSelector(state=>state.oneItem.item)
    console.log(oneItem , "one")
    const [modalOn, setModalOn] = useState(false)
    

    // 이미지를 받아오기 위한 과정들
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
        if (sessionStorage.getItem('id')){
            await axios.post('/basket/add',{
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
        }else{
            alert('로그인 후 사용 가능 합니다')
        }
    }


    // 모달창에 보낼 변수
    const order = {
        "username": sessionStorage.getItem("id"),
        "itemid":oneItem.itemid,
        "itemname":oneItem.itemname,
        "location":null,
        "itemprice":oneItem.price,
        "itemimg":img1,
        "bcount":bcount
    }

    // 구매요청 단일 품목
    const makeOrder = async (addr)=>{
        window.confirm("정말 구매하시겠습니까?")
        order.location=addr;
        await axios.post("/orderHistory/add",{
            // body ,2번째 괄호
            OrderHistory:[order]
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
                state :{
                    orderItems: [order],
                    addr : addr,
                },
            })
        }).catch(error => {
            console.log(error, ' makeOrder 에러');
        })
    }

    const sweetTest = ()=>{
         
    }

    const rendering = ()=>{
        return(
            <>
        <div>
            <h1 onClick={sweetTest}>Product Info</h1>
            <br/><br/>
            <p> 상품명/품번 : <b>{oneItem.itemname}/{oneItem.itemid}</b> </p>
            <div className="descStar">
                <div>평점 : {oneItem.reviewmean ? JSON.stringify(oneItem.reviewmean).substring(0,4) : "등록된 상품평이 없습니다"} </div>
                <div><ReactStars edit={false} value={oneItem.reviewmean}/></div>
            </div>
            <p> 가격 : <b>{getStringPrice(oneItem.price)}</b> </p>
            <p> 구매수 : <b>{oneItem.purchasecnt}</b> </p>
            <p> 리뷰 수 : {oneItem.reviewcount}</p>
            {/* 장바구니 주문 갯수 정하기 */}
            <div>
                <form>
                <div class="value-button" id="decrease" onClick={increaseNum} value="Decrease Value"><div className="plusminus">-</div></div>
                    <input type="number" id="number" value={bcount}/>
                <div class="value-button" id="increase" onClick={decreaseNum} value="Increase Value"> <div className="plusminus">+</div></div>
                </form>
            </div>
            {/* 모달창 */}
            <BeforeOrder makeOrder={makeOrder} orderItems={[order]} show={modalOn} onHide = {()=>{setModalOn(false)}} />

            {/* 장바구니 담기 버튼 */}
            <div style={{position:"relative", left:"25rem"}}>
            <Button onClick={() => {
                
                addBasket(sessionStorage.getItem("id") , oneItem.itemid, img1, oneItem.itemname, oneItem.price,bcount)
                }}>
                장바구니 담기
            </Button>
            &nbsp;
            <Button onClick={()=>{
                if (sessionStorage.getItem('id')){
                    setModalOn(true)
                }else{
                    alert('로그인 후 사용 가능합니다')
                }
                
            }}>즉시구매</Button>
            </div>
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