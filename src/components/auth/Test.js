import React, { useState } from 'react';
import PopupDom from './PopupDom';
import PopupPostCode from './PopupPostCode';
import {Button} from "react-bootstrap";
 
const Test = (props) => {
	// 팝업창 상태 관리
    const [isPopupOpen, setIsPopupOpen] = useState(false)
 
	// 팝업창 열기
    const openPostCode = () => {
        setIsPopupOpen(true)
    }
	// 팝업창 닫기
    const closePostCode = () => {
        setIsPopupOpen(false)
    }
    return(
        <div>
            <Button type='button' onClick={openPostCode}>우편번호 검색</Button>
            <div id='popupDom'>
                {isPopupOpen && (
                    <PopupDom>
                        <PopupPostCode onClose={closePostCode} plz = {props}/>
                    </PopupDom>
                )}
            </div>
        </div>
    )
}
 
export default Test;