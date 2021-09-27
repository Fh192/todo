import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ITask } from '../../types/todoTypes';
import css from './Task.module.css';
import {
  reorderTask,
  deleteTask,
  updateTask,
} from '../../store/reducers/todoReducer';
import DeleteIcon from '../SVG/DeleteIcon';

interface Props {
  task: ITask;
  tasks: Array<ITask>;
  currentTask: ITask | null;
  setCurrentTask: React.Dispatch<React.SetStateAction<ITask | null>>;
}

const Task: React.FC<Props> = ({
  task,
  tasks,
  currentTask,
  setCurrentTask,
}) => {
  const dispatch = useDispatch();

  const { todoListId, id, status, title } = task;
  const [isCompleted, setIsCompleted] = useState(status === 1 ? true : false);

  const onTaskRemove = () => {
    dispatch(deleteTask(todoListId, id));
  };

  const onCompletedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.currentTarget.checked;
    const status = checked ? 1 : 0;

    dispatch(updateTask(todoListId, id, { ...task, status }));
    setIsCompleted(checked);
  };

  const dragStartHandler = (e: React.DragEvent<HTMLDivElement>) => {
    setCurrentTask(task);
  };
  const dragLeaveHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.style.background = '#fff';
  };

  const dragOverHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.75)';
  };

  const dropHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.style.background = '#fff';

    if (currentTask) {
      const currentTaskIndex = tasks.findIndex(t => t.id === currentTask.id);
      const taskIndex = tasks.findIndex(t => t.id === id);

      if (currentTask.id !== id) {
        if (taskIndex === 0) {
          dispatch(reorderTask(todoListId, currentTask.id, null));
        } else {
          if (currentTaskIndex > taskIndex) {
            dispatch(reorderTask(todoListId, id, currentTask.id));
          } else {
            dispatch(reorderTask(todoListId, currentTask.id, id));
          }
        }
      }
    }
  };

  return (
    <div
      className={css.task}
      draggable={true}
      onDragStart={dragStartHandler}
      onDragLeave={dragLeaveHandler}
      onDragOver={dragOverHandler}
      onDrop={dropHandler}
    >
      <div className={css.block}>
        <div className={css.completed}>
          <input
            type='checkbox'
            checked={isCompleted}
            onChange={onCompletedChange}
          />
        </div>
        <div className={css.title} title={title}>
          <span>{title}</span>
        </div>
      </div>

      <div className={css.deleteTask} onClick={onTaskRemove}>
        <DeleteIcon size={'17px'} />
      </div>
    </div>
  );
};

export default Task;
