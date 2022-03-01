import axios from "axios";
import { connect } from "react-redux";
import { add_main_items } from "../redux/items/types";
import { addBestItems } from "../redux/bestItem/actions"
import { addTop } from "../redux/bestItem/actions";
import { addOuter } from "../redux/bestItem/actions";
import { addPants } from "../redux/bestItem/actions";
import { useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";


const GetBestItems = async (url) =>{
    const dispatch = useDispatch()
    console.log(url, 'bestUrl GetBestItems들어옴')
    
    await axios.get('http://127.0.0.1:8081'+url, {
        headers: {
            "Content-Type": "application/json",
        }
    }).then(res => {
        let temp = Object.entries(res.data) // 4개의 배열로 나눈다
        let all = temp[0] // all
        let top = temp[1] // top
        let outer = temp[3] // bottom
        let pants = temp[2] // outer
        console.log(temp , " bestItem res temp")
        console.log(res, "resres")

        dispatch(addBestItems(all[1]))
        dispatch(addTop(top[1]))
        dispatch(addOuter(outer[1]))
        dispatch(addPants(pants[1]))

    }).catch(error => {
        console.log(error, ' bestItem error');
    })
    
  }


export default GetBestItems