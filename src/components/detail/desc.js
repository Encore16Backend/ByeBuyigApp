import React, { useDebugValue, useState } from "react";
import { Button, InputGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import ReactStars from "react-stars"
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import postRefresh from "../../hooks/postRefresh"
import "../../css/desc.css"

const DetailDesc = ({pdtState, lendering, setLandering})=>{

    const history = useHistory();
     // 들어온 카테고리의 상세 품목 길이
     const allItem = useSelector(state => state.Item.items)

    // 해당 페이지 받아오기
    const oneItem = useSelector(state=>state.oneItem.item)
    

     
    const desc = pdtState.description
    const itemname = pdtState.itemname
    const purchasecnt = pdtState.purchasecnt
    const price = pdtState.price
    const reviewmean = pdtState.reviewmean
    const itemid = pdtState.itemid
    const reviewcount = pdtState.reviewcount
    const img1 = pdtState.images[0].imgpath

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

    

    const render = allItem.filter(item => item.itemid === itemid)
    const renderedItem = render[0] ? render[0] : ""

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
            {/* 장바구니 담기 버튼 */}
            <Button onClick={() => addBasket(
                sessionStorage.getItem("id") , oneItem.itemid, img1, oneItem.itemname,
                oneItem.price,bcount
            )}>장바구니 담기</Button>
        </div>
            </>
        )
    }
    
    

    return(
        <> 
        {
            (pdtState !== undefined) ? rendering() : ""
        }
            
        </>
    )
}

export default DetailDesc