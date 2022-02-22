import React from "react";
import { InputGroup, FormControl } from "react-bootstrap";

const MakeReview = () =>{

    return(
        <div>
            <InputGroup>
                <InputGroup.Text>리뷰 작성</InputGroup.Text>
                <FormControl as="textarea" aria-label="With textarea" />
            </InputGroup>
        </div>
    )
}

export default MakeReview