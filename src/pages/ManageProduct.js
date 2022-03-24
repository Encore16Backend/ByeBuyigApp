import React from 'react'
import '../axiosproperties'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { Table, Button, Form, FormControl, Row, Col, Accordion } from 'react-bootstrap'
import Page from "../components/Base/main/Page";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { addMainItems } from '../redux/items/actions'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import MyCalendar from '../components/etc/MyCalendar'
import { getStringPrice } from "../axiosproperties";


const ManageProduct = () => {

    var history = useHistory();
    const [allPdt, setAllPdt] = useState([]);
    const [pageNo, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState();
    const dispatch = useDispatch();
    const [searchItem, setSearchItem] = useState('');
    const [allitem, setAllitem] = useState([]);
    const [searchstate, setSearchState] = useState(-1);
    


    // 모든 아이템 정보 받아옴
    useEffect(() => {
        axios.get('/main/search', {
            params: {
                searchName: searchItem,
                page: pageNo
            },
            headers: {
                "Content-Type": "application/json",
            }
        }).then(res => {
            setTotalPage(res.data.totalPages)
            dispatch(addMainItems(res.data.content))
            setAllitem(res.data.content)
        }).catch(error => {
            console.log(error, ' getItem');
        })
    }, [pageNo, searchstate])



    // 상품 검색 (카테고리, 이름)
    const onsearchitem = (e) => {
        setSearchItem(e.target.value);
    }



    const onSubmit = (e) => {
        e.preventDefault();

    }

    const [checkItems, setCheckItems] = useState([]);
    // 상품 삭제
    const delProduct = (itemid) => {
        if (window.confirm('정말 삭제하시겠습니까?')) {
            axios.delete('main/item/delete', {
                params: {
                    itemid: itemid,
                }
            }, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + sessionStorage.getItem('access_token')
                }
            }).then(res => {
                setPage(1)
                alert('상품 삭제 완료')
            }).catch(error => {
                console.log(error);
            })
        }
    }



    const handlePage = (value) => {
        setPage(value);
    }

    const pdtname = () => {
        setSearchState(searchstate * -1);
        startpage()
    }

    const startpage = () => {
        if (pageNo !== 1) {
            setPage(1)
        }
    }

    //  chk함수
    const reviewCheck = (checked, itemid) => {
        if (checked) {
            setCheckItems([...checkItems, itemid]);
        } else {
            // 체크 해제
            setCheckItems(checkItems.filter((x) => x != itemid));
        }
    }

    const allReviewCheck = (checked) => {
        if (checked) {
            const itemid = [];
            allitem.forEach((res) => {
                itemid.push(res.itemid);
            });
            setCheckItems(itemid);
        } else {
            // 전체 체크 박스 제거
            setCheckItems([]);
        }
    }


    return (
        <>
            <h1 className='centered'> 상품 관리</h1>
            {/* 검색 폼 */}
            <Form className="review" onSubmit={onSubmit} style={{ paddingLeft: "48px" }} >

                <div style={{ display: "flex" }}>
                    <FormControl type="search" placeholder="상품이름" className="me-2" aria-label="Search"
                        value={searchItem} onChange={onsearchitem} style={{ width: "15%" }} />&nbsp;
                    <Button type="submit" style={{ width: "70px" }} onClick={pdtname}>Search</Button>

                    <Button style={{ float: "right", marginLeft: "63rem" }} onClick={() => { delProduct(checkItems) }}>일괄 삭제</Button>
                </div>
            </Form>

            <div className='userbox'>
                <Table>
                    <thead>
                        <tr>
                            <th className="checkBox" style={{ width: "5%" }}>
                                <div>
                                    <Form.Check
                                        type='checkbox' id='checkbox'
                                        onChange={(e) => allReviewCheck(e.target.checked)}
                                        checked={checkItems.length === 10 ? true : false}
                                    />
                                </div>
                            </th>
                            <th style={{ width: "10%" }}>상품사진</th>
                            <th style={{ width: "35%" }}>상품명</th>
                            <th style={{ width: "13%" }}>카테고리</th>
                            <th style={{ width: "7%" }}>가격</th>
                            <th style={{ width: "10%" }}>리뷰평균</th>
                            <th style={{ width: "10%" }}>구매수</th>
                            <th style={{ width: "10%" }}>삭제</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            (allitem.length != 0) ? allitem.map((data, idx) => {
                                let itemid = data.itemid;
                                let itemname = data.itemname;
                                let price = data.price;
                                let reviewmean = data.reviewmean;
                                let purchasecnt = data.purchasecnt;
                                let pdtImg = data.images[0] != undefined ? data.images[0].imgpath : "";
                                let catasArr = data.categories[0] != undefined ? data.categories : "";
                                let catas = []
                                if (catasArr != "") {
                                    catasArr.map((cata) => {
                                        catas.push(cata.catename)
                                    })
                                }

                                let Adata =
                                    <>
                                        <tr>
                                            <td>
                                                <Form>
                                                    <div className="checkBox">
                                                        <Form.Check
                                                            type='checkbox' className={`checkbox-${itemid}`}
                                                            onChange={(e) => reviewCheck(e.target.checked, itemid)}
                                                            checked={checkItems.includes(itemid) ? true : false}
                                                        />
                                                    </div>
                                                </Form>
                                            </td>
                                            <td> <img src={`https://byebuying.s3.ap-northeast-2.amazonaws.com/` + pdtImg} width="80" height="96" /></td>
                                            <td>
                                                <Link to={{
                                                    pathname: "/detail", search: "?itemid=" + itemid,
                                                    state: {
                                                        itemid: itemid,
                                                    },
                                                }}>
                                                    {itemname}
                                                </Link>
                                            </td>
                                            <td>
                                                {catas.join(', ')}
                                            </td>
                                            <td>{getStringPrice(price)}</td>
                                            <td>{reviewmean ? JSON.stringify(reviewmean).substring(0, 4) : "0"} 점</td>
                                            <td>{purchasecnt}개</td>
                                            <td> <Button  onClick={() => { delProduct(itemid) }}>삭제</Button> </td>
                                        </tr>
                                    </>
                                return (Adata)
                            }) : ""
                        }

                    </tbody>
                </Table>
            </div>
            <div className="centered">
                {
                    totalPage != 0 ? <Page
                        setPage={handlePage}
                        totalPage={totalPage}
                        selected={pageNo}
                    /> : ""
                }
            </div>
        </>
    )
}

export default ManageProduct