import { useState, useCallback } from "react";
import styles from "src/components/task/card/card.module.css";

// redux
import { useAppDispatch } from "src/app/hooks";
import { create_task_modal } from "src/features/project/projectSlice";

// types
import { ITask, Status } from "src/types/task";

// config
import { PlusIcon } from "src/config/icons";

type TaskCardProps = {
  data?: ITask[];
  type: Status;
  title: string;
};

function TaskCard(props: TaskCardProps) {
  const dispatch = useAppDispatch();

  return (
    <div className={styles.card}>
      <header className={styles.card_header}>
        <h6 className={styles.card_title}>{props.title}</h6>
        <span className={styles.tasks_length}>{props.data?.length || 0}</span>
      </header>
      <main className={styles.card_body}>
        <ul className={styles.tasks_list}>
          {props.data?.map(task => (
            <li key={task.id} className={styles.task}>
              {task.title}
            </li>
          ))}
          <li
            className={styles.task_create}
            onClick={() =>
              dispatch(
                create_task_modal({ visibility: true, status: props.type })
              )
            }
          >
            <PlusIcon />
            <span>Create Task</span>
          </li>
        </ul>
      </main>
    </div>
  );
}

export default TaskCard;
