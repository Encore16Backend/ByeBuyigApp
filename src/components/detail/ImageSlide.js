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
    const { images, itemname } = this.props;
    return (
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
                  <img src={image.imgpath} />
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
                <img src={(image.imgpath)} />
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