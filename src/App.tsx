// utils
import { useAppSelector } from "src/app/hooks";

// components
import ProjectModal from "src/features/project/projectModal";
import AppLayout from "src/components/layout";

function App() {
  const { projects, active } = useAppSelector(state => state.project);

  if (projects.length === 0) return <ProjectModal />;
  return <AppLayout>{active?.name}</AppLayout>;
}

export default App;
