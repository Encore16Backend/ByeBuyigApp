import axios from "axios";
import React, { useState } from "react";
import { Button, Form,InputGroup,FormControl, Container } from "react-bootstrap";
import '../axiosproperties'

const SaveProduct = ()=>{

    // {
    //     item: {name, price, purchasecnt, count, reviewmean, reviewcount},
    //     cate: [upper, lower], 상의, 반팔
    //     images: [0, 1, 2] /test/test.jpg, /test/test2.jpg, /test/test3.jpg
    // }


    // 파일 미리볼 url을 저장해줄 state
    const [fileImage, setFileImage] = useState("");
    const [file, setFile] = useState();

    // // 파일 저장
    const saveFileImage = (e) => {
        // console.log(e.target.files[0])
        setFile(e.target.files[0]);
        setFileImage(URL.createObjectURL(e.target.files[0]));
    };

    // 파일 삭제
    const deleteFileImage = () => {
        URL.revokeObjectURL(fileImage);
        setFileImage("");
    };



    const [pdtName  , setPdtName] = useState('')
    const [pdtCate  , setPdtCate] = useState([])
    const [pdtImg, setPdtImg] = useState('')
    const [pdtPrice , setPdtPrice] = useState(0)


    // {
    //     item: {name, price, purchasecnt, count, reviewmean, reviewcount},
    //     cate: [upper, lower], 상의, 반팔
    //     images: [0, 1, 2] /test/test.jpg, /test/test2.jpg, /test/test3.jpg
    // }

    const tempSave = () => {
    const data = {
        "item": {
            "itemname": "test상품",
            "price": 10000,
            "purchasecnt": 0,
            "count": 200,
            "reviewmean": 0,
            "reviewcount": 0
        },
        "cate": [
            "상의", "반팔"
        ],
        "images": ['/test/1.jpg', '/test/1.jpg', '/test/1.jpg']
    }
    axios.post('/main/item/save', {
            itemSave: data
        }, {
            // header
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + sessionStorage.getItem('access_token')
            }
        })
        .then(res => {
            console.log(res, "res")
        })
        .catch(error => {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        })
    }
    const onSubmit = ()=>{

    }



    return(
        <div>
            <Container>
            <Form onSubmit={onSubmit} encType="multipart/form-data">
                <div className="centered">
                    {/* 이미지 미리보기 */}
                    <div>
                    {
                        fileImage ? ( <img alt="sample" src={fileImage} style={{ margin: "auto" ,width:"350px",height:"250px"}}/>):
                        <div style={{ margin: "auto", width:"350px", height:"250px", border:"1px solid black"}}></div>
                    }
                    </div>
                </div>
                <div className="centered">
                        <input name="imgUpload" type="file"  accept="image/*" onChange={saveFileImage}/>
                        {/* 삭제버튼 */} <Button onClick={() => deleteFileImage()}>삭제 </Button>
                </div>
                <Form.Group>
                    <Form.Label>상품명</Form.Label>
                    <Form.Control placeholder="등록상품명을 입력하세요"  />
                    <br />
                    <Form.Label>가격</Form.Label>
                    <Form.Control placeholder="등록상품가격을 입력하세요"  />
                    <br />
                    <Form.Label>상위 카테고리를 선택하시오</Form.Label>
                    <Form.Select aria-label="Default select example">
                    {/* onChange={(e) => {setFashion(e.target.value)}} value={fashion} */}
                        <option value="1" >없음</option>
                        <option value="2" >캐주얼</option>
                        <option value="3" >미니멀</option>
                        <option value="4" >스트릿</option>
                        <option value="5" >시티보이</option>
                        <option value="6" >아메카지</option>
                    </Form.Select>
                    <br />
                    <Form.Label>하위 카테고리를 선택하시오</Form.Label>
                    <Form.Select aria-label="Default select example">
                    {/* onChange={(e) => {setFashion(e.target.value)}} value={fashion} */}
                        <option value="1" >없음</option>
                        <option value="2" >캐주얼</option>
                        <option value="3" >미니멀</option>
                        <option value="4" >스트릿</option>
                        <option value="5" >시티보이</option>
                        <option value="6" >아메카지</option>
                    </Form.Select>
                    <br />
                </Form.Group>

                
                

                <Button type="submit"> 등록 </Button>
            </Form>
            </Container>
            <Form>
                <InputGroup>
                    <FormControl as="textarea" aria-label="With textarea"/>
                    <Button onClick={tempSave}>temp</Button>
                </InputGroup>
            </Form>
        </div>
    )
}

export default SaveProduct