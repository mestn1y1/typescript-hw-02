import css from "./LoadMore.module.css";

export default function LoadMore({ onClick, loadMoreRef }) {
  return (
    <button onClick={onClick} className={css.loadMoreBtn} ref={loadMoreRef}>
      Load more
    </button>
  );
}
