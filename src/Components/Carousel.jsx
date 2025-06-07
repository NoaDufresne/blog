import React from 'react';
import { Carousel } from 'antd';
import beach from '../assets/beach.jpeg';
import nyc from '../assets/nyc.jpeg';
import mountain from '../assets/mountain.jpeg';
import china from '../assets/china.jpeg';

export default function CustomCarousel() {
  const images = [beach, nyc, mountain, china];

  return (
    <Carousel autoplay autoplaySpeed={3000}>
      {images.map((src, idx) => (
        <div key={idx} style={{ height: 300 }}>
          <img
            src={src}
            alt={`slide-${idx}`}
            loading="lazy"
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
