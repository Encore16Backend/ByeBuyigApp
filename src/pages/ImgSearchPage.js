import { Button, Form, Modal } from "react-bootstrap";
import React, { useState } from "react";
import axios from "axios";

const ImgSearchPage = ({ show, onHide,})=>{


  //파일 미리볼 url을 저장해줄 state
  const [fileImage, setFileImage] = useState("");
  const [file, setFile] = useState();

  // 파일 저장
  const saveFileImage = (e) => {
    console.log(e.target.files[0])
    setFile(e.target.files[0]);
    setFileImage(URL.createObjectURL(e.target.files[0]));
  };

  // 파일 삭제
  const deleteFileImage = () => {
    URL.revokeObjectURL(fileImage);
    setFileImage("");
  };
  

  // 파일 전송 바디로보내기
  const onSubmit = (e)=>{
    e.preventDefault();

    const frm = new FormData();
    frm.append("file", file);

    axios.post('http://192.168.0.208:8081/flask/retrieval', frm ).then((res)=>{
      console.log(res)
    }).catch(error =>{
      console.log(error)
    })
    alert("전송완료")
  }

  const closeHander = ()=>{
    onHide()
  }

  return (
    <div>
       <Modal
      show={show}
      onHide={closeHander}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
         <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          이미지검색
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Form onSubmit={onSubmit} encType="multipart/form-data">
        <div className="centered">
            {/* 이미지 미리보기 */}
            <div>
            {fileImage ? ( <img alt="sample" src={fileImage} style={{ margin: "auto" ,width:"350px",height:"250px"}}/>):
                <div style={{ margin: "auto", width:"350px", height:"250px", border:"1px solid black"}}>

                </div>
            }
            </div>
        </div>
        {/* centered끝 */}
        <div className="centered">
        <input name="imgUpload" type="file"  accept="image/*" onChange={saveFileImage}/>
                {/* 삭제버튼 */}
                {/* <button
                onClick={() => deleteFileImage()}>삭제
                </button> */}
                {/* 검색 */}
              <Button type="submit"> 검색 </Button>
          </div>
      </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={closeHander}>닫기</Button>
      </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ImgSearchPage