import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css';

function ImageGalleryItem({ id, imgSrc, tags }) {
  return (
    <>
      <li id={id} className={s.galleryItem}>
        <img
          src={imgSrc}
          alt={tags}
          width="200"
          height="150"
          className={s.galleryImg}
        />
      </li>
    </>
  );
}

ImageGalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  imgSrc: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
