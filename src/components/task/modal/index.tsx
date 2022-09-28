import { useState, useCallback, useEffect } from "react";
import styles from "src/components/task/modal/createTaskModal.module.css";

// redux
import { useAppDispatch, useAppSelector } from "src/app/hooks";
import {
  create_task_modal,
  create_task
} from "src/features/project/projectSlice";

// components
import Button from "src/components/button";

// config
import { XIcon } from "src/config/icons";

// types
import { Priority, Status, Type } from "src/types/task.d";

type Task = {
  title: string;
  description: string;
  type: Type;
  priority: Priority;
  status: Status;
};

function CreateTaskModal() {
  const dispatch = useAppDispatch();
  const { task_modal } = useAppSelector(state => state.project);
  const [task, setTask] = useState<Task>({
    title: "",
    description: "",
    type: Type.Task,
    priority: Priority.Medium,
    status: task_modal.status || Status.NextUp
  });

  // input handlers
  const handleChange = useCallback(
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      setTask(prev => ({
        ...prev,
        [e.target.name]: e.target.value
      }));
    },
    [task]
  );

  // create task
  const createTask = useCallback(() => {
    dispatch(create_task(task));
    dispatch(create_task_modal({ visibility: false }));
  }, [task, task_modal.status]);

  // effect when status changed
  useEffect(() => {
    setTask(prev => ({
      ...prev,
      status: task_modal.status || Status.NextUp
    }));
  }, [task_modal.status]);

  if (!task_modal.visibility) return null;
  return (
    <div
      role="dialog"
      aria-modal={true}
      aria-hidden={false}
      className={styles.task_modal}
    >
      <div className={styles.modal}>
        <header className={styles.modal_header}>
          <h6>Create Task</h6>
          <button
            type="button"
            className={styles.close}
            onClick={() => dispatch(create_task_modal({ visibility: false }))}
          >
            <XIcon />
          </button>
        </header>

        <main className={styles.modal_body}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              id="title"
              name="title"
              type="text"
              onChange={handleChange}
              autoComplete="off"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              onChange={handleChange}
              autoComplete="off"
            />
          </div>

          <div className="form-group">
            <label htmlFor="type">Type</label>
            <select
              name="type"
              id="type"
              onChange={handleChange}
              defaultValue={task.type}
            >
              <option value={Type.Task}>Task</option>
              <option value={Type.Epic}>Epic</option>
              <option value={Type.Story}>Story</option>
              <option value={Type.Bug}>Bug</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="priority">Priority</label>
            <select
              name="priority"
              id="priority"
              onChange={handleChange}
              defaultValue={task.priority}
            >
              <option value={Priority.Low}>Low</option>
              <option value={Priority.Medium}>Medium</option>
              <option value={Priority.High}>High</option>
            </select>
          </div>

          <div className="form-group">
            <Button type="button" title="Create Project" onClick={createTask}>
              Create Task
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
}

export default CreateTaskModal;
