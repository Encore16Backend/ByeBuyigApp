import React from 'react';
import "../../css/imgslide.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faArrowRight} from "@fortawesome/free-solid-svg-icons"
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons"



class ImageSlide extends React.Component {
  constructor() {
    super();
    this.state = {
      imageCurrentNo: 0,
    };
  }

  onChangeImage = index => {
    if (this.props.images.length <= index) index = 0;
    if (index < 0) index = this.props.images.length - 1;
    this.setState({ imageCurrentNo: index });
  };

  render() {
    const { images } = this.props;
    // console.log(`https://byebuying.s3.ap-northeast-2.amazonaws.com`+images[0].imgpath.substring(1), "path")

    return (

// src={`https://byebuying.s3.ap-northeast-2.amazonaws.com/상품이미지/상의/반팔/84b481a403fcae53616aedc99a86d125696cc733fa481288ddf9c8c89b95.jpg`}
      <>
      <div className="imageSlide">
        <div className="navBox">
          <span>{this.state.imageCurrentNo + 1}</span>
          <span>/</span>
          <span>{images && images.length}</span>
        </div>
        <div className="slideBox">
          <div
            className="slideList"
            style={{
              transform: `translate3d(
                ${this.state.imageCurrentNo * -500}px, 0px, 0px`,
            }}
          >
            {images?.map((image, no) => (
              <div className="slideContent" key={image.imgid}>
                <picture>
                  <img src={`https://byebuying.s3.ap-northeast-2.amazonaws.com/`+image.imgpath} />
                </picture>
              </div>
            ))}
          </div>

          <div
            className="buttonPrev"
            onClick={() => this.onChangeImage(this.state.imageCurrentNo - 1)}
          >
            <FontAwesomeIcon icon={faArrowLeft} className="faArrow" id="faArrowLeft"/>
            
          </div>
          <div
            className="buttonNext"
            onClick={() => this.onChangeImage(this.state.imageCurrentNo + 1)}
            >
            <FontAwesomeIcon icon={faArrowRight} className="faArrow" id="faArrowRight"/>
          </div>
        </div>
        <div className="paginationBox">
          {images?.map((image, no) => (
            <div
              key={no}
              onClick={() => {

                this.onChangeImage(no);
              }}
            >
              <picture>
                <img src={(`https://byebuying.s3.ap-northeast-2.amazonaws.com/`+image.imgpath)} />
              </picture>
            </div>
          ))}
        </div>
      </div>
      </>
    );
  }
}

export default ImageSlide;