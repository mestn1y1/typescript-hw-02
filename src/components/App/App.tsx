import { useState, useEffect, useRef } from "react";

import "./App.css";
import { SearchBar } from "../SearchBar/SearchBar";
import searchImagesApi from "../searchImagesApi";
import { ImageGallery } from "../ImageGallery/ImageGallery";
import { ImageModal } from "../ImageModal/ImageModal";
import { Loader } from "../Loader/Loader";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
import { LoadMoreBtn } from "../LoadMoreBtn/LoadMoreBtn";
import toast, { Toaster } from "react-hot-toast";
import { Image } from "./App.types";

export const App: React.FC = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [modalImage, setModalImage] = useState<Image | null>(null);
  const [topic, setTopic] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const loadMoreBtnRef = useRef<HTMLButtonElement>(null);

  const handleLoadMore = (): void => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handleSearch = (newTopic: string): void => {
    setTopic(newTopic);
    setPage(1);
    setImages([]);
    setError(false);
  };

  useEffect(() => {
    if (!topic) return;

    const getImages = async (): Promise<void> => {
      try {
        setLoading(true);
        const { images: newImages, totalPages: newTotalPages } =
          await searchImagesApi(topic, page);

        if (page === 1 && newImages.length === 0) {
          toast.error("No images found for this search term.", {
            duration: 1500,
          });
        }
        setImages((prevImages) =>
          page === 1 ? newImages : [...prevImages, ...newImages]
        );
        setTotalPages(newTotalPages);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    getImages();
  }, [topic, page]);

  useEffect(() => {
    if (images.length > 0 && page > 1) {
      loadMoreBtnRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [images, page]);

  const openModal = (image: Image | null): void => {
    setModalImage(image);
  };

  const closeModal = (): void => {
    setModalImage(null);
  };

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      <Toaster />
      {error ? (
        <ErrorMessage />
      ) : (
        <>
          <ImageGallery images={images} onOpenModal={openModal} />
          {loading && <Loader />}
          {images.length > 0 && !loading && page < totalPages && (
            <LoadMoreBtn
              onClick={handleLoadMore}
              loadMoreRef={loadMoreBtnRef}
            />
          )}
          {images.length > 0 && !loading && page >= totalPages && (
            <b>End of collection</b>
          )}
        </>
      )}
      {modalImage && (
        <ImageModal
          isOpen={modalImage ? true : false}
          onRequestClose={closeModal}
          image={modalImage}
        />
      )}
    </>
  );
};
