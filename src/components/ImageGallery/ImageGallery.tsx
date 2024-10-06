import { Image } from "../App/App";
import { ImageCard } from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";

interface ImageGalleryProps {
  images: Image[];
  onOpenModal: (image: Image) => void;
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  onOpenModal,
}) => {
  return (
    <ul className={css.gallery}>
      {images.length > 0 ? (
        images.map((image) => (
          <li key={image.id} className={css.galleryItem}>
            <ImageCard image={image} onOpenModal={onOpenModal} />
          </li>
        ))
      ) : (
        <p>
          Images are not available yet. Please fill in the search field to
          display them
        </p>
      )}
    </ul>
  );
};
