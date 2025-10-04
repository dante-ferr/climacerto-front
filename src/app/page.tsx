import Image from "next/image";
import styles from "./page.module.scss";
import SearchForm from "./components/SearchForm";

export default function Home() {
  return (
    <div className={styles.page}>
      <SearchForm />
      <div> </div>
    </div>
  );
}
