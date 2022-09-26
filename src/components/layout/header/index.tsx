import styles from "src/components/layout/header/header.module.css";

// redux
import { useAppSelector } from "src/app/hooks";

function Header() {
  const { active } = useAppSelector(state => state.project);

  return (
    <header className={styles.header}>
      <h1 className={styles.title}>{active?.name}</h1>
      <p className={styles.desc}>{active?.description}</p>
    </header>
  );
}

export default Header;
