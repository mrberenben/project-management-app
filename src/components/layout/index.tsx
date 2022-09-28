// components
import Header from "src/components/layout/header";

type AppLayoutProps = {
  children: React.ReactNode;
};

const styles: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  blockSize: "100%",
  marginBlockStart: 90
};

function AppLayout(props: AppLayoutProps) {
  return (
    <>
      <Header />
      <div style={styles}>{props.children}</div>
    </>
  );
}

export default AppLayout;
