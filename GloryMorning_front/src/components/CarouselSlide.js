import React, { Component } from 'react'

import {
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption
  } from 'reactstrap';
  
  const items = [
    {
      src: '/images/9b6c403aca6a07526762f16d2c1e0453.png',
      altText: '',
      caption: '한방울의 먹물보다 못하다',
      captionHeader : '어떤 강렬한 기억도'
    },
    {
      src: '/images/nightload.jpeg',
      altText: '',
      caption: '언젠가 닿을 수 있다',
      captionHeader : '언젠가'
    },
    {
      src: '/images/milkey.jpeg',
       altText: 'Slide 3',
      caption: '',
      captionHeader : '조그만 노력이 태산이 된다'
    }
  ];
  
  class CarouselSlide extends Component {
    constructor(props) {
      super(props);
      this.state = { activeIndex: 0 };
      this.next = this.next.bind(this);
      this.previous = this.previous.bind(this);
      this.goToIndex = this.goToIndex.bind(this);
      this.onExiting = this.onExiting.bind(this);
      this.onExited = this.onExited.bind(this);
    }
  
    onExiting() {
      this.animating = true;
    }
  
    onExited() {
      this.animating = false;
    }
  
    next() {
      if (this.animating) return;
      const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
      this.setState({ activeIndex: nextIndex });
    }
  
    previous() {
      if (this.animating) return;
      const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
      this.setState({ activeIndex: nextIndex });
    }
  
    goToIndex(newIndex) {
      if (this.animating) return;
      this.setState({ activeIndex: newIndex });
    }
  
    render() {
      const { activeIndex } = this.state;
  
      const slides = items.map((item,index) => {
        return (
          <CarouselItem
            onExiting={this.onExiting}
            onExited={this.onExited}
            key={item.src}
          >
          <img src={item.src} alt={item.altText} />
            <CarouselCaption captionText={item.caption} captionHeader={item.captionHeader} />
          </CarouselItem>
        );
      });
  
      return (
        <div>
          <Carousel
            activeIndex={activeIndex}
            next={this.next}
            previous={this.previous}
          >
            <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
            {slides}
            <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
            <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
          </Carousel>
        </div>
      );
    }
  }
  
  
  export default CarouselSlide;