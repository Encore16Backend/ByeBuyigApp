import React, { useEffect, useState } from "react";
import Realsidebar from "../components/Base/Side/Realsidebar";

const ImgSearchPage = ()=>{
  //파일 미리볼 url을 저장해줄 state
  const [fileImage, setFileImage] = useState("");

  // 파일 저장
  const saveFileImage = (e) => {
    setFileImage(URL.createObjectURL(e.target.files[0]));
  };

  // 파일 삭제
  const deleteFileImage = () => {
    URL.revokeObjectURL(fileImage);
    setFileImage("");
  };
  const search = ()=>{

  }

  return (
    <div>
        <div className="centered">
            {/* 이미지 미리보기 */}
            <div>
            {fileImage ? (
                <img
                alt="sample"
                src={fileImage}
                style={{ margin: "auto" ,width:"700px",height:"500px"}}
                />):
                <div style={{ margin: "auto" ,width:"700px",height:"500px" , border:"1px solid black"}}>

                </div>
                
            }
            </div>
        </div>
        {/* centered끝 */}
        <div className="centered">
        <input
                name="imgUpload"
                type="file"
                accept="image/*"
                onChange={saveFileImage}/>
            {/* 삭제버튼 */}
                {/* <button
                onClick={() => deleteFileImage()}>삭제
                </button> */}
                {/* 검색 */}
                <button
                style={{
                  
                }}
                onClick={() => search()}>검색
                </button>
        </div>
    </div>
  );
}

export default ImgSearchPage