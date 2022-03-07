import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useHistory, useLocation } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux'
import { addBasket } from "../redux/basket/actions"
import Page from "../components/Base/main/Page";
import { Form, Button, Table } from "react-bootstrap";
import { cond } from "lodash";


const ShoppingBasket = () => {
    const location = useLocation();
    const locationState = location.state;
    const userid = sessionStorage.getItem("id");
    const dispatch = useDispatch();
    const histroy = useHistory();

    // ShoppingBasket에서 사용할 state
    let [pageNo, setPathNo] = useState(1);
    let [totalPageNo, setTotalPageNo] = useState();
    const [basketItem, setBasketItem] = useState([]);
    const [checkBaskets, setCheckBaskets] = useState([]);
    const [checkItems, setCheckItems] = useState([]);
    const [AllBasketNum, setAllBasketNum] = useState(0);



    // 장바구니 받아오는 axios
    const GetBasketItem = async (userid, pageNo) => {
        console.log("Get")
        await axios.get('http://127.0.0.1:8081/basket/byUsername', {
            params: {
                username: userid,
                page: pageNo
            },
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + sessionStorage.getItem('access_token')
            }
        }).then(res => {
            const data = res.data
            setTotalPageNo(data.totalPages);
            setBasketItem(data.content)
            setAllBasketNum(data.content.length)
            // dispatch(addBasket(res.data.content))
        }).catch(error => {
            console.log(error, ' GetBasketItem 에러');
        })
    }

    useEffect(() => {
        GetBasketItem(userid, pageNo)
    }, [pageNo])

    // 페이징함수
    const handlePage = (value) => {
        // GetBasketItem(userid, value)
        setPathNo(value);
    }

    const reviewCheck = (checked, basketid, itemid) => {
        if (checked) {
            setCheckBaskets([...checkBaskets, basketid]);
            setCheckItems([...checkItems, itemid]);
        } else {
            // 체크 해제
            setCheckBaskets(checkBaskets.filter((x) => x !== basketid));
            setCheckItems(checkItems.filter((x) => x != itemid));
        }
    }

    const allBasketCheck = (checked) => {
        if (checked) {
            const basketid = []; // `checkbox-${reviewid}`
            const itemid = [];
            basketItem.forEach((res) => {
                basketid.push(res.id);
                itemid.push(res.itemid);
            });
            setCheckBaskets(basketid);
            setCheckItems(itemid);
        } else {
            // 전체 체크 박스 제거
            setCheckBaskets([]);
            setCheckItems([]);
        }
    }

    // 장바구니에서 삭제
    const onSubmit = async (e) => {
        e.preventDefault();
        console.log(checkBaskets, "checkBaskets")
        await axios.delete("http://127.0.0.1:8081/basket/delete", {
            params: {
                basketid: checkBaskets
            }
        }).then(res => {
            setCheckItems([])
            window.location.reload()
        }).catch(err => {
            console.log(err)
        })
    }

    // 장바구니에서 수량 변경
    const changeBcount = () => {

    }



    return (
        <Container>
            <Form className='review' onSubmit={onSubmit} >
                <div className='title'>장바구니</div>

                <div>
                    <Button type="submit" className="remove" variant="secondary" size="sm">삭제</Button>
                </div>
                <div>
                    <Table>
                        <thead>
                            <tr>
                                <th className="checkBox">

                                    <div >
                                        <Form.Check
                                            type='checkbox' id='checkbox'
                                            onChange={(e) => allBasketCheck(e.target.checked)}
                                            checked={checkBaskets.length === AllBasketNum ? (AllBasketNum === 0 ? false : true) : false}
                                        />
                                    </div>
                                </th>
                                <th></th>
                                <th>상품정보</th>
                                <th>가격</th>
                                <th colSpan={2}>수량</th>
                                {/* <th>별점</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {/* 
                bcount: 1
                id: 2
                itemid: 5
                itemimg: "./상품이미지/바지/데님팬츠/BUCKLE WIDE DENIM PANTS BLACK1.jpg"
                itemname: "BUCKLE WIDE DENIM PANTS BLACK"
                itemprice: 41400
                username: "qwerqwer" */
                            }
                            {
                                basketItem.map((data) => {
                                    let bcount = data.bcount

                                    let id = data.id
                                    let itemid = data.itemid
                                    let itemimg = data.itemimg
                                    let itemname = data.itemname
                                    let itemprice = data.itemprice
                                    let reviewData =
                                        <tr key={id}>
                                            <td className="checkBox">
                                                <Form>
                                                    <div className="checkBox">
                                                        <Form.Check
                                                            type='checkbox' className={`checkbox-${id}`}
                                                            onChange={(e) => reviewCheck(e.target.checked, id, itemid)}
                                                            checked={checkBaskets.includes(id) ? true : false}
                                                        />
                                                    </div>
                                                </Form>
                                            </td>
                                            <td>
                                                <img src={itemimg} width="80" height="96" style={{ marginRight: "5px" }} />
                                            </td>
                                            <td>
                                                {itemname}
                                            </td>
                                            <td>{itemprice}</td>
                                            <td colSpan={2}>
                                                {bcount}
                                                {/* <div>
                                            <form>
                                            <div class="value-button" id="decrease"  value="Decrease Value"><div className="plusminus">-</div></div>
                                                <input type="number" id="number" value={bcount}/>
                                            <div class="value-button" id="increase"  value="Increase Value"> <div className="plusminus">+</div></div>
                                            </form>
                                        </div> */}
                                            </td>
                                            {/* <td>?</td> */}
                                        </tr>
                                    return (reviewData)
                                })
                            }
                        </tbody>

                    </Table>
                </div>
            </Form>
            <div className="centered">
                {
                    totalPageNo != 0 ? <Page
                        setPage={handlePage}
                        totalPage={totalPageNo}
                        selected={pageNo}
                    /> : ""
                }
            </div>
        </Container>
    )
}

export default ShoppingBasket