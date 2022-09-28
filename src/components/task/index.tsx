import { Draggable } from "react-beautiful-dnd";
import styles from "src/components/task/task.module.css";

// types
import { ITask } from "src/types/task";

type TaskProps = {
  task: ITask;
  index: number;
};

const TaskType = {
  1: "Epic",
  2: "Story",
  3: "Task",
  4: "Bug"
};

const TaskPriority = {
  1: "Low",
  2: "Mid",
  3: "High"
};

function Task({ task, index }: TaskProps) {
  return (
    <Draggable draggableId={task.id} index={index}>
      {provided => (
        <li
          className={styles.task}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div className={styles.task_header}>
            <span data-task-type={task.type}>{TaskType[task.type]}</span>
            <h6>{task.title}</h6>
          </div>
          <div className={styles.task_body}>
            <p>{task.description}</p>
            <span data-task-priority={task.priority}>
              {TaskPriority[task.priority]}
            </span>
          </div>
        </li>
      )}
    </Draggable>
  );
}

export default Task;
