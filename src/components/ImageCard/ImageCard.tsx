import { Image } from '../App/App.types';
import css from "./ImageCard.module.css";

type ImageCardProps = {
  image: Image;
  onOpenModal: (image: Image) => void;
}

export const ImageCard: React.FC<ImageCardProps> = ({ image, onOpenModal }) => {
  return (
    <div className={css.itemImg}>
      <img
        onClick={() => onOpenModal(image)}
        src={image.urls.small_s3}
        alt={image.description || "Image"}
        className={css.galleryImg}
      />
    </div>
  );
};
