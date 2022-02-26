import axios from "axios";
import { connect } from "react-redux";
import { add_best_cata_items } from "../redux/bestcataItem/types";
import { addBestCataItems } from "../redux/bestcataItem/actions";
import { useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";


const GetBestCataItems = async (url) =>{
    const dispatch = useDispatch()

    await axios.get('http://127.0.0.1:8081'+url, {
        headers: {
            "Content-Type": "application/json",
        }
    }).then(res => {
        console.log(res.data , " bestCataItem")
        dispatch(addBestCataItems(res.data))
    }).catch(error => {
        console.log(error, ' bestCataItem');
    })
  }
 

export default GetBestCataItems