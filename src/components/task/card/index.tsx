import { useState, useCallback } from "react";
import { Droppable } from "react-beautiful-dnd";
import styles from "src/components/task/card/card.module.css";

// redux
import { useAppDispatch } from "src/app/hooks";
import { create_task_modal } from "src/features/project/projectSlice";

// components
import Task from "src/components/task";

// types
import { ITask, Status } from "src/types/task";

// config
import { PlusIcon } from "src/config/icons";
import { useStrictDroppable } from "src/utils/useStrictDroppable";

type TaskCardProps = {
  data?: ITask[];
  type: Status;
  title: string;
};

function TaskCard(props: TaskCardProps) {
  const dispatch = useAppDispatch();
  const [enabled] = useStrictDroppable(false);

  if (!enabled) return null;
  return (
    <div className={styles.card}>
      <header className={styles.card_header}>
        <h6 className={styles.card_title}>{props.title}</h6>
        <span className={styles.tasks_length}>{props.data?.length || 0}</span>
      </header>
      <main className={styles.card_body}>
        <Droppable droppableId={`state-${props.type}`}>
          {provided => (
            <ul
              className={styles.tasks_list}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {props.data?.map((task: ITask, index: number) => (
                <Task key={task.id} task={task} index={index} />
              ))}
              {provided.placeholder}
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
          )}
        </Droppable>
      </main>
    </div>
  );
}

export default TaskCard;
