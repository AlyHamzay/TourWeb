import React from 'react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import galleryImages from './galleryImages';

const MasonryImagesGallery = () => {
  return (
    <ResponsiveMasonry
      columnsCountBreakPoints={{
        350: 1, // 1 column for very small screens
        768: 2, // 2 columns for tablets
        992: 3, // 3 columns for medium-sized screens
        1200: 4, // 4 columns for larger screens
      }}
    >
      <Masonry gutter="1rem">
        {galleryImages.map((item, index) => (
          <img
          className='masonry__img'
            src={item}
            key={index}
            alt=""
            style={{
              width: '100%',
              display: 'block',
              borderRadius: '10px',
            }}
          />
        ))}
      </Masonry>
    </ResponsiveMasonry>
  );
};

export default MasonryImagesGallery;
