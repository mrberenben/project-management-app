import styles from "src/assets/styles/app.module.css";

// redux
import { useAppSelector } from "src/app/hooks";

// components
import ProjectModal from "src/features/project/projectModal";
import AppLayout from "src/components/layout";
import Header from "src/components/layout/header";
import TaskCard from "src/components/task/card";
import CreateTaskModal from "src/components/task/modal";

// types
import { Status } from "src/types/task.d";

function App() {
  const { projects, active } = useAppSelector(state => state.project);

  if (projects.length === 0) return <ProjectModal />;
  return (
    <AppLayout>
      <Header />

      <main className={styles.main}>
        <div className={styles.deck}>
          <TaskCard title="Next Up" type={Status.NextUp} />
          <TaskCard title="In Progress" type={Status.InProgress} />
          <TaskCard title="Review" type={Status.Review} />
          <TaskCard title="Completed" type={Status.Completed} />
        </div>
      </main>

      <ProjectModal />
      <CreateTaskModal />
    </AppLayout>
  );
}

export default App;
