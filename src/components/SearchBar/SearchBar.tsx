import { toast } from "react-hot-toast";
import css from "./SearchBar.module.css";

type SearchBarProps = {
  onSearch: (newTopic: string) => void;
};

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>): void => {
    evt.preventDefault();
    const form = evt.currentTarget;
    const topic = (
      form.elements.namedItem("topic") as HTMLInputElement
    ).value.trim();

    if (topic === "") {
      toast.error("Please enter a search term.", {
        duration: 1500,
      });
      return;
    }
    onSearch(topic);
    form.reset();
  };

  return (
    <header className={css.header}>
      <form onSubmit={handleSubmit} className={css.form}>
        <input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="topic"
        />
        <button type="submit" className={css.btn}>
          Search
        </button>
      </form>
    </header>
  );
};
