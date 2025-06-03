import React from 'react';
import { Carousel } from 'antd';
import beach from '../assets/beach.jpeg';
import nyc from '../assets/nyc.jpeg';
import mountain from '../assets/mountain.jpeg';

export default function CustomCarousel() {
  const images = [beach, nyc, mountain];

  return (
    <Carousel autoplay dots>
      {images.map((src, idx) => (
        <div key={idx} style={{ height: 300 }}>
          <img
            src={src}
            alt={`slide-${idx}`}
            style={{
              width: '100%',
              height: '400px',
              objectFit: 'cover',
              display: 'block',
              borderRadius: 0,
            }}
          />
        </div>
      ))}
    </Carousel>
  );
}
