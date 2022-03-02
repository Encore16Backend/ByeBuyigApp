import axios from "axios";
import { connect } from "react-redux";
import { add_main_items } from "../redux/items/types";
import { addMainItems } from "../redux/items/actions";
import { useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";


const GetMainItem = async () =>{
    const dispatch = useDispatch()
    console.log( "getMainItem 시작")
    await axios.get('http://127.0.0.1:8081/main/items', {
        headers: {
            "Content-Type": "application/json",
        }
    }).then(res => {
       dispatch(addMainItems(res.data))
    }).catch(error => {
        console.log(error.data , "getMainItem error")
        console.log(error, ' getItemLis');
    })
    console.log( "getMainItem 종료")
  }


export default GetMainItem