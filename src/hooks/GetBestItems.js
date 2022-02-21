import axios from "axios";
import { connect } from "react-redux";
import { add_main_items } from "../redux/items/types";
import { addBestItems } from "../redux/bestItem/actions"
import { useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";


const GetBestItems = async (url) =>{
    const dispatch = useDispatch()
    console.log(url, 'bestUrl')
    

    await axios.get('http://127.0.0.1:8081'+url, {
        headers: {
            "Content-Type": "application/json",
        }
    }).then(res => {
        console.log(res.data , " bestItem")
        dispatch(addBestItems(res.data))
    }).catch(error => {
        console.log(error, ' bestItem');
    })
  }


export default GetBestItems