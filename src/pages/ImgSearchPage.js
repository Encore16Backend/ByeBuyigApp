import { Button, Form, Modal } from "react-bootstrap";
import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const ImgSearchPage = ({ show, onHide,})=>{

  const history = useHistory();

  //파일 미리볼 url을 저장해줄 state
  const [fileImage, setFileImage] = useState("");
  const [file, setFile] = useState();

  // 파일 저장
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
  

  // 파일 전송 바디로보내기
  // from 데이터는 다른 페이지로 보낼 수 없음
  // 계속해서 쿼리를 보내려면 frm 객체를 가지고있어야함 (ex 페이징)
  // // 여기서는 보내는것만 
  const onSubmit = (e)=>{
    e.preventDefault();

    // const frm = new FormData();
    // frm.append("file", file);

    // 2, 3 안
    // sessionStorage.setItem('frm', frm)
    // sessionStorage.setItem('file', file)
    
    history.push({  
      pathname: "/imgsearchresult",
      state:{file:file}
    }) 
    deleteFileImage()
    closeHander()



    // axios.post('http://192.168.0.208:8081/flask/retrieval', frm ).then((res)=>{
    //   console.log(res.data)
    //   history.push({  
    //     pathname: "/imgsearchresult",
    //     state:{file:file, 
    //             res:res.data}
    //   }) 
    //   alert("전송완료")

    // }).catch(error =>{
      
    //   alert("실패")
    //   console.log(error)
    //   history.push({
    //     pathname: "/imgsearchresult",
    //     state:{file:file, error:error}
    //   }) 
    //   closeHander()
    // })



  }

  const closeHander = ()=>{
    deleteFileImage()
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
                <Button onClick={() => deleteFileImage()}>삭제 </Button>
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