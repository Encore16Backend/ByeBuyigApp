import React from 'react';
import DaumPostcode from "react-daum-postcode";
import { Button } from 'react-bootstrap';
 
const PopupPostCode = (props) => {
	// 우편번호 검색 후 주소 클릭 시 실행될 함수, data callback 용
    const handlePostCode = (data) => {
        let fullAddress = data.address;
        let extraAddress = ''; 
        
        if (data.addressType === 'R') {
          if (data.bname !== '') {
            extraAddress += data.bname;
          }
          if (data.buildingName !== '') {
            extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
          }
          fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
        }

        

        // 여기서 값을 전달해야댐
        if (props.plz.setIsAddress && props.plz.setIsZoneCode){
            props.plz.setIsAddress(fullAddress)
            props.plz.setIsZoneCode(data.zonecode)
        }
        if (props.plz.onAllAddr){
          props.plz.onAllAddr(fullAddress, data.zonecode)
        }
        props.onClose()
    }
    let sty = {} 

    if (props.plz.sty === 1){
        sty = {
          position:"relative", left:"32rem", top:"15rem", zIndex:"9999", top:"1rem"
        }
    }else if (props.plz.sty === 2) {
      sty = {
        position:"relative", left:"32rem", top:"15rem", zIndex:"9999", top:"-3rem"
      }
    }
    else{
        sty = {position:"relative", left:"32rem", top:"15rem", zIndex:"9999"}
    }
    
 
    const postCodeStyle = {
        display: "block",
        position: "absolute",
        top: "10%",
        width: "600px",
        height: "600px",
        padding: "7px",
      };
 
    return(
        <div>
            <DaumPostcode style={postCodeStyle} onComplete={handlePostCode} />
            <Button type='button' style={sty}  onClick={() => {props.onClose()}} className='postCode_btn'>닫기</Button>
        </div>
    )
}
 
export default PopupPostCode;