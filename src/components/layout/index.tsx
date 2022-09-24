import Header from "src/components/layout/header";

function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
}

export default AppLayout;
