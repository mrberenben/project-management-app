import styles from "src/components/button/button.module.css";
import Loader from "src/components/loader";

type ButtonProps = {
  type: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "tertiary";
  title?: string;
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
};

function Button({ variant, title, loading, disabled, ...props }: ButtonProps) {
  return (
    <button
      className={`${styles.button} ${styles[variant || "primary"]}`}
      aria-label={title}
      disabled={disabled || loading}
      {...props}
    >
      <span className={styles.children}>{props.children}</span>
      {loading && <Loader />}
    </button>
  );
}

export default Button;
