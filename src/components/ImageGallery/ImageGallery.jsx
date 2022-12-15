import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import propTypes from 'prop-types';
import css from './ImageGallery.module.css';

export const ImageGallery = ({ images, onClick }) => (
  <ul className={css.ImageGallery}>
    {images.map((image, id) => (
      <ImageGalleryItem onClick={onClick} image={image} key={id} />
    ))}
  </ul>
);

ImageGallery.propTypes = {
  images: propTypes.arrayOf(
    propTypes.shape({
      id: propTypes.number.isRequired,
    })
  ),
  onClick: propTypes.func.isRequired,
};