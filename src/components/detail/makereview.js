import axios from "axios";
import React, { useState } from "react";
import { InputGroup, FormControl, Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import postRefresh from "../../hooks/postRefresh";
import { useSelector } from "react-redux";

const MakeReview = ({pdtState, lendering, setLandering}) =>{




    const USERID = useSelector(state => state.user.ID)

    const pdtId = pdtState.itemid
    const pdtName = pdtState.itemname
    const userId = localStorage.getItem('id')
    const [content , setContent] = useState('')
    const [score, setScore] = useState(0)

    const makeContent = (e)=>{
        setContent(e.target.value)
    }
    const makeScore = (e)=>{
        setScore(e.target.value)
    }

    // 댓글등록함수
    const onSubmit = async (e)=>{
        e.preventDefault();
        if (content === ""){
            alert("내용을 입력하세요")
            return
        }else if (USERID === ""){
            alert("로그인 후에 작성 할 수 있습니다")
            return
        }

        await axios.post('http://127.0.0.1:8081/review/save',{
                // body
                itemname : pdtName,
                username : userId,
                content: content,
                score : parseFloat(score)
        },{
            // header
            headers:{
                "Content-Type": "application/json",
                "Authorization": "Bearer " + sessionStorage.getItem('access_token')
            }
        }).then(res =>{
            console.log(res, "댓글 등록 완료")
            setLandering(!lendering)
            alert('댓글 등록 완료')
        }).catch(error =>{
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            postRefresh() // 토큰이 없으면 재발행시키는 함수
            onSubmit(e) //  토큰을 받고 실행하고 싶은 함수 다시 실행
        })
    }

    const chkUser = ()=>{
        
    }




    return(
        <div>
         <Form onSubmit={onSubmit}>
            <InputGroup>
                <FormControl as="textarea" aria-label="With textarea" onChange={makeContent} value={content} />
                <Form.Select aria-label="Default select example" onChange={
                makeScore
              } value={score}>
                <option value="1.0">1</option>
                <option value="2.0">2</option>
                <option value="3.0">3</option>
                <option value="4.0">4</option>
                <option value="5.0">5</option>
              </Form.Select>
                <Button type="submit" onClick={chkUser}>리뷰작성</Button>
            </InputGroup>
        </Form>
        </div>
    )
}

export default MakeReview