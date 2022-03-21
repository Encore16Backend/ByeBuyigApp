import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form, InputGroup, FormControl, Container } from "react-bootstrap";
import '../axiosproperties'
import { ACCESS_KEY, SECRET_ACCESS_KEY, S3_BUCKET, REGION } from '../axiosproperties'
import AWS from "aws-sdk"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const SaveProduct = () => {

    const frm = new FormData();
    const history = useHistory();

    AWS.config.update({
        accessKeyId: ACCESS_KEY,
        secretAccessKey: SECRET_ACCESS_KEY
    });
    const myBucket = new AWS.S3({
        params: { Bucket: S3_BUCKET },
        region: REGION,
    });




    const [files, setFiles] = useState([])
    const [fileNames, setFileNames] = useState([])
    const [fileImgs, setFileImgs] = useState([])

    // 파일 저장
    const saveFileImage = (e, num, cataOne, cataTwo) => {
        // aws에 저장할 파일명
        // 배열에 파일 저장
        setFiles([...files, e.target.files[0]])
        // 배열에 파일이름 저장, 다 정해줘야댐
        // './상품이미지/바지/슬랙스/우먼즈 슬림 스트레이트 히든 밴딩 슬랙스 블랙1.jpg'
        setFileNames([...fileNames,  e.target.files[0].name]) //'상품이미지/'+cata1+'/'+cata2 +'/'+
        // 로컬에 띄울 이미지 배열
        setFileImgs([...fileImgs, URL.createObjectURL(e.target.files[0])])
        // 파일이름만 저장

        
    };


    // https://byebuying.s3.ap-northeast-2.amazonaws.com품이미지/상의/긴팔/키작은여성의류1.jpg
    // 이렇게 db에서 받는다..

    console.log(files, 'files')
    console.log(fileNames, 'fileNames')
    console.log(fileImgs, "fileImgs")


    // 파일 삭제
    const deleteFileImage = () => {
        fileImgs.map((f) => {
            URL.revokeObjectURL(f);
        })
        setFiles([])
        setFileNames([])
        setFileImgs([])
        
    };


    const [cata1Arr, setCata1Arr] = useState(['바지', '상의', '스커트', '아우터'])
    const [cata2Pants, setCata2Pants] = useState(['데님팬츠', '반바지', '슬랙스'])
    const [cata2Top, setCata2Top] = useState(['긴팔', '반팔', '셔츠'])
    const [cata2Skirt, setCata2Skirt] = useState(['롱스커트', '미니스커트'])
    const [cata2Outer, setCata2Outer] = useState(['롱패딩', '숏패딩', '코트', '트렌치 코트'])

    const [pdtName, setPdtName] = useState('')
    const [pdtCount, setPdtCount] = useState(200)
    const [pdtPrice, setPdtPrice] = useState(0)
    const [cata1, setCata1] = useState('상의')
    const [cata2, setCata2] = useState('긴팔')

    const tempSave = () => {
        const imageFile = []
        for(var i=0; i<fileNames.length;i++){
            imageFile.push('상품이미지/'+cata1+'/'+cata2+'/'+fileNames[i]);
        }
        console.log(imageFile, "최종");

        const data = {
            "item": {
                "itemname": pdtName,
                "price": pdtPrice,
                "purchasecnt": 0,
                "count": pdtCount,
                "reviewmean": 0,
                "reviewcount": 0
            },
            "cate": [
                cata1, cata2
            ],
            "images": imageFile
        }

        // // file배열로 돌면서 s3업로드
        files.map((f, idx) => {
            const s3Obj = {
                ACL: 'public-read',
                Body: f,
                Bucket: S3_BUCKET,
                Key: imageFile[idx]
            }
            myBucket.putObject(s3Obj)
                .on('httpUploadProgress', (evt) => {
                    setTimeout(() => {
                        // setFiles([]);
                    }, 1000)
                })
                .send((err) => {
                    if (err) console.log(err)
                })
        })
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
            alert('등록완료')
            setFiles([])
            setFileNames([])
            setFileImgs([])
            history.push('/')
        })
        .catch(error => {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        })
    }



    const cataChange = (e) => {
        // '바지', '상의', '스커트', '아우터'
        setCata1(e)
        if (e === '바지'){
            setCata2(cata2Pants[0])
        }else if (e === '상의'){
            setCata2(cata2Top[0])
        }else if (e === '스커트'){
            setCata2(cata2Skirt[0])
        }else if (e === '아우터'){
            setCata2(cata2Outer[0])
        }
    }


    const onSubmit = ()=>{

    }
    // 이미지 폼 반복을 위함


    // 하위컴포넌트 랜더링
    const cata2Render = () => {
        let opt = ''
        if (cata1 === '상의') {
            opt = cata2Top.map((top) => {
                return (<option value={top}>{top}</option>)
            })
        } else if (cata1 === '바지') {
            opt = cata2Pants.map((pants) => {
                return (<option value={pants}>{pants}</option>)
            })
        } else if (cata1 === '스커트') {
            opt = cata2Skirt.map((skirt) => {
                return (<option value={skirt}>{skirt}</option>)
            })
        } else if (cata1 === '아우터') {
            opt = cata2Outer.map((outer) => {
                return (<option value={outer}>{outer}</option>)
            })
        }
        return (
            opt
        )
    }



    return (
        <div>

            {/* <label htmlFor="upload" className="image-upload-wrapper">
            <img className="profile-img"
            src={`https://byebuying.s3.ap-northeast-2.amazonaws.com/상품이미지/바지/데님팬츠/22SS 컷팅 배색 와이드 데님 팬츠_LIGHT BLUE1.jpg`}/>
            </label>  */}

            <Container>
                <h2 className="centered">상품등록</h2>
                <Form onSubmit={onSubmit} encType="multipart/form-data">

                    {/* 이미지 미리보기 */}
                    <div style={{ position: "relative", top: "10px", paddingBottom: "4rem", paddingTop: "4rem" }}>
                        <div className="centered">
                            {
                                fileImgs[0] ? <img alt="img" src={fileImgs[0]} style={{ margin: "auto", width: "350px", height: "250px" }} /> :
                                    <div style={{ margin: "auto", width: "350px", height: "250px", border: "1px solid black" }}></div>
                            }
                            {
                                fileImgs[1] ? <img alt="img" src={fileImgs[1]} style={{ margin: "auto", width: "350px", height: "250px" }} /> :
                                    ""
                            }
                            {
                                fileImgs[2] ? <img alt="img" src={fileImgs[2]} style={{ margin: "auto", width: "350px", height: "250px" }} /> :
                                    ""
                            }
                        </div>
                        <div className="centered">
                            {
                                files[0] === undefined ? <input name="imgUpload" type="file" accept="image/*" onChange={(e) => { saveFileImage(e, 1) }} />
                                    : ""
                            }
                            {
                                files[1] === undefined ? <input name="imgUpload" type="file" accept="image/*" onChange={(e) => { saveFileImage(e, 2) }} />
                                    : ""
                            }
                            {
                                files[2] === undefined ? <input name="imgUpload" type="file" accept="image/*" onChange={(e) => { saveFileImage(e, 3) }} />
                                    : ""
                            }

                            <Button onClick={() => deleteFileImage()}>삭제 </Button>

                        </div>
                    </div>
                    <Form.Label>상품명</Form.Label>
                    <Form.Control placeholder="등록상품명을 입력하세요" value={pdtName} onChange={(e)=>setPdtName(e.currentTarget.value)} />
                    <br />
                    <Form.Label>가격</Form.Label>
                    <Form.Control placeholder="등록상품가격을 입력하세요" value={pdtPrice} onChange={(e)=>setPdtPrice(e.currentTarget.value)} />
                    <br />
                    <Form.Label>수량</Form.Label>
                    <Form.Control placeholder="등록상품수량을 입력하세요" value={pdtCount} onChange={(e)=>setPdtCount(e.currentTarget.value)} />
                    <br />
                    <Form.Label>상위 카테고리를 선택하시오</Form.Label>
                    <Form.Select aria-label="Default select example"
                        onChange={(e) => { cataChange(e.target.value) }} value={cata1}
                    >
                        {
                            cata1Arr.map((cataBig) => {
                                return (
                                    <option value={cataBig}>{cataBig}</option>
                                )
                            })
                        }
                    </Form.Select>
                    <br />
                    <Form.Label>하위 카테고리를 선택하시오</Form.Label>
                    <Form.Select aria-label="Default select example"
                        onChange={(e) => { setCata2(e.target.value) }} value={cata2}>
                        {cata2Render()}
                    </Form.Select>
                    <br />
                </Form>
            </Container>
            <Form>
                <InputGroup>
                    <Button style={{marginLeft:"90rem"}} onClick={tempSave}>등록</Button>
                </InputGroup>
            </Form>
        </div>
    )
}

export default SaveProduct