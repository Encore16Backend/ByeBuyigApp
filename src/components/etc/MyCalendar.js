import { Modal } from "react-bootstrap";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import DatePicker from "react-datepicker";


const MyCalendar = ({startDate,setStartDate, endDate, setEndDate})=>{



    // const [startDate, setStartDate] = useState(new Date());
    // const [endDate, setEndDate] = useState(new Date());

    return(
    <div style={{display:"inline"}}>
        <div style={{width:"200px", display:"inline-flex"}}>
        <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        selectsStart
        startDate={startDate}
        endDate={endDate}/>
        </div>
        <div style={{width:"200px", display:"inline-block"}}>
        <DatePicker
        selected={endDate}
        onChange={(date) => setEndDate(date)}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}/>
        </div>
    </div>
    )
}

export default MyCalendar