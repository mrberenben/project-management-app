// components
import Sidebar from "src/components/layout/sidebar";

type AppLayoutProps = {
  children: React.ReactNode;
};

function AppLayout(props: AppLayoutProps) {
  return (
    <>
      <Sidebar />
      <main style={{ marginInlineStart: 260, padding: "3rem" }}>
        {props.children}
      </main>
    </>
  );
}

export default AppLayout;
