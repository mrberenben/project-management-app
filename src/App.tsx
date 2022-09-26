// utils
import { useAppSelector } from "src/app/hooks";

// components
import ProjectModal from "src/features/project/projectModal";
import AppLayout from "src/components/layout";
import Header from "src/components/layout/header";

function App() {
  const { projects, active, project_modal_visibility } = useAppSelector(
    state => state.project
  );

  if (projects.length === 0) return <ProjectModal visibility={true} />;
  return (
    <AppLayout>
      <Header />
      <ProjectModal visibility={project_modal_visibility} />
    </AppLayout>
  );
}

export default App;
