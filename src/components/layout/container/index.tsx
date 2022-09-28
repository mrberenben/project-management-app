import styles from "src/components/layout/container/container.module.css";

function Container({ children }: { children: React.ReactNode }) {
  return <div className={styles.container}>{children}</div>;
}

export default Container;
