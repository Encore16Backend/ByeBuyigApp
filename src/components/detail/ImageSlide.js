import React from 'react';
import imgcss from "../../css/imgslide.css"

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
    console.log(this.props , "이미지에 들어옴")
    const { images } = this.props;
    return (
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
            <i class="fas fa-chevron-left"></i>
          </div>
          <div
            className="buttonNext"
            onClick={() => this.onChangeImage(this.state.imageCurrentNo + 1)}
          >
            <i class="fas fa-chevron-right"></i>
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
                <img src={image.imgpath} />
              </picture>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default ImageSlide;