import { useCallback, useEffect } from "react";
import styles from "src/assets/styles/app.module.css";
import { DragDropContext } from "react-beautiful-dnd";

// redux
import { useAppSelector, useAppDispatch } from "src/app/hooks";
import { sort_tasks, move_tasks } from "src/features/project/projectSlice";

// components
import ProjectModal from "src/features/project/projectModal";
import AppLayout from "src/components/layout";
import Header from "src/components/layout/header";
import TaskCard from "src/components/task/card";
import CreateTaskModal from "src/components/task/modal";

// types
import { Status } from "src/types/task.d";
import Container from "./components/layout/container";

function App() {
  const { projects, active } = useAppSelector(state => state.project);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (process.env.NODE_ENV !== "development") {
      const onContextMenu = (e: MouseEvent) => e.preventDefault();
      window.addEventListener("contextmenu", onContextMenu);

      return () => window.removeEventListener("contextmenu", onContextMenu);
    }
  }, []);

  // droppable drag end event
  const onDragEnd = useCallback((result: any) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    if (source.droppableId !== destination.droppableId) {
      dispatch(
        move_tasks({
          id: draggableId,
          source: {
            index: source.index,
            droppable: +source.droppableId.split("-")[1]
          },
          destination: {
            index: destination.index,
            droppable: +destination.droppableId.split("-")[1]
          }
        })
      );

      return;
    }

    dispatch(
      sort_tasks({
        id: draggableId,
        source: {
          index: source.index,
          droppable: +source.droppableId.split("-")[1]
        },
        destination: {
          index: destination.index
        }
      })
    );
  }, []);

  if (projects.length === 0) return <ProjectModal />;
  return (
    <AppLayout>
      <main className={styles.main}>
        <Container>
          <header className={styles.project_header}>
            <h1 className={styles.project_title}>{active?.name}</h1>
            <p className={styles.project_desc}>{active?.description}</p>
          </header>

          <div className={styles.deck}>
            <DragDropContext onDragEnd={onDragEnd}>
              <TaskCard
                title="Next Up"
                type={Status.NextUp}
                data={active?.tasks[Status.NextUp]}
              />
              <TaskCard
                title="In Progress"
                type={Status.InProgress}
                data={active?.tasks[Status.InProgress]}
              />
              <TaskCard
                title="Review"
                type={Status.Review}
                data={active?.tasks[Status.Review]}
              />
              <TaskCard
                title="Completed"
                type={Status.Completed}
                data={active?.tasks[Status.Completed]}
              />
            </DragDropContext>
          </div>
        </Container>
      </main>

      <ProjectModal />
      <CreateTaskModal />
    </AppLayout>
  );
}

export default App;
