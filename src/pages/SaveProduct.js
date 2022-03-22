import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Button, Form, InputGroup, FormControl, Container,Row, Col } from "react-bootstrap";
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
    const saveFileImage = (e) => {
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
        // que로 하나씩 뺌
        const fileImgStack = [...fileImgs]
        const fileNamesStack = [...fileNames]
        const filesStack = [...files]
        // fileImgs.map((f) => {
        //     URL.revokeObjectURL(f);
        // })

        const shiftedImg = fileImgStack.shift()
        URL.revokeObjectURL(shiftedImg)
        fileNamesStack.shift()
        filesStack.shift()

        setFileImgs(fileImgStack)
        setFileNames(fileNamesStack)
        setFiles(filesStack)
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
        // file배열로 돌면서 s3업로드
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

    const imgSwap = (idx) =>{

        // 가져온 인덱스의 파일과 0번 인덱스의 파일을 바꾸고 새로 배열에 넣어야함  

        const fileImgQue = [...fileImgs]
        const fileNamesQue = [...fileNames]
        const filesQue = [...files]

        // js의 구조분해 할당을 사용해보자
        if (fileImgQue){
            [fileImgQue[0], fileImgQue[idx]] = [fileImgQue[idx], fileImgQue[0]]
            setFileImgs(fileImgQue)
        }
        if (fileNamesQue){
            [fileNamesQue[0], fileNamesQue[idx]] = [fileNamesQue[idx], fileNamesQue[0]]
            setFileNames(fileNamesQue)
        }
        if (filesQue){
            [filesQue[0], filesQue[idx]] = [filesQue[idx], filesQue[0]]
            setFiles(filesQue)
        }


        // setFileImgs(fileImgQue)
        // setFileNames(fileNamesQue)
        // setFiles(filesQue)
        
    }


    const onSubmit = ()=>{

    }

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


    const inputRef = useRef()

    return (
        <div>

            {/* <label htmlFor="upload" className="image-upload-wrapper">
            <img className="profile-img"
            src={`https://byebuying.s3.ap-northeast-2.amazonaws.com/상품이미지/바지/데님팬츠/22SS 컷팅 배색 와이드 데님 팬츠_LIGHT BLUE1.jpg`}/>
            </label>  */}

            <Container>
                <h2 className="centered">상품등록</h2>
                
                <Form onSubmit={onSubmit} encType="multipart/form-data">
                    <Row>
                                {/* 상품이미지 input */}
                    <div className="centered" style={{position:"relative"}}>

                            {/* {
                                files[0] === undefined ? <div className="filebox"><label className="input-file-button" htmlFor="input_file1">메인이미지 업로드</label>
                                <input name="imgUpload" id="input_file1" type="file" accept="image/*"  style={{display:"none"}}  onChange={(e) => { saveFileImage(e) }} /></div>
                                    : ""
                            }
                            {
                                files[1] === undefined ? <div className="filebox">
                                <label className="input-file-button" htmlFor="input_file2">추가 이미지 업로드</label>
                                <input name="imgUpload" id="input_file2" type="file" accept="image/*" style={{display:"none"}}  onChange={(e) => { saveFileImage(e) }} />
                                </div>
                                    : ""
                            } */}
    
                    </div>
                        <Col>
                    {/* 이미지 미리보기 */}
                    <div style={{ position: "relative", top: "-49px", paddingBottom: "4rem", paddingTop: "4rem" }}>
                        <div className="centered" style={{display:"grid"}}>
                            {
                                fileImgs[0] ? <img alt="img" src={fileImgs[0]} style={{  width: "400px", height: "250px" , padding:"5px" }} /> :
                                    <div style={{ margin: "auto", width: "350px", height: "250px", border: "1px solid black" }}></div>
                            }
                            <div>
                            {
                                fileImgs[1] ?  <img alt="img" onClick={()=>{imgSwap(1)}}  src={fileImgs[1]} style={{  width: "200px", height: "100px", padding:"5px" }} /> :
                                ""
                            }
                            {
                                fileImgs[2] ?  <img alt="img" onClick={()=>{imgSwap(2)}}  src={fileImgs[2]} style={{  width: "200px", height: "100px", padding:"5px" }} /> :
                                ""
                            }
                            </div>
                        </div>
                    </div>
                    </Col>
                    <Col>
                    <br/>
                    <div>
                    {
                        files[2] === undefined ?  <div className="filebox" style={{display:"contents"}}>
                        <label className="input-file-button" htmlFor="input_file3">이미지 업로드</label>
                        <input name="imgUpload" id="input_file3" type="file" accept="image/*" style={{display:"none"}} onChange={(e) => { saveFileImage(e) }} />
                        </div>
                        : <div className="filebox" style={{display:"contents"}}>
                        <label className="input-file-button" >업로드 완료 </label>
                        <input name="imgUpload" id="input_file3" type="file" accept="image/*" style={{display:"none"}} onChange={(e) => { saveFileImage(e) }} />
                        </div>
                        
                    }
                     <Button style={{  marginLeft:"34rem"}} onClick={() => deleteFileImage()}>삭제 </Button>
                    </div>
                    <br/>

                    <Form.Label>상품명</Form.Label>
                    <Form.Control placeholder="등록상품명을 입력하세요" value={pdtName} onChange={(e)=>setPdtName(e.currentTarget.value)} />
                    <br />
                    <Form.Label>가격</Form.Label>
                    <Form.Control placeholder="등록상품가격을 입력하세요"   value={pdtPrice}  onChange={(e)=>setPdtPrice(e.currentTarget.value.replace(/[^0-9.]/g,'').replace(/(\..*)\./g, '$1'))} />
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
                    </Col>
                    </Row>
                </Form>
                
            </Container>
            <Form>
            <br/>
                <InputGroup>
                    <Button style={{ width:"100px", marginLeft:"45rem"}} onClick={tempSave}>등록</Button>
                </InputGroup>
            </Form>
        </div>
    )
}

export default SaveProduct