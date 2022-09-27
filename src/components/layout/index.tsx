// components
import Sidebar from "src/components/layout/sidebar";

type AppLayoutProps = {
  children: React.ReactNode;
};

const styles: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  blockSize: "100%",
  marginInlineStart: 280,
  padding: "3rem"
};

function AppLayout(props: AppLayoutProps) {
  return (
    <>
      <Sidebar />
      <div style={styles}>{props.children}</div>
    </>
  );
}

export default AppLayout;
