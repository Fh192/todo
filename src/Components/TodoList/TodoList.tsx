import React, { useEffect, useState } from 'react';
import css from './TodoList.module.css';
import Task from '../Task/Task';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router';
import { RootState } from '../../store/store';
import {
  getTodoListTasks,
  addNewTask,
  updateTask,
} from '../../store/reducers/todoReducer';
import { ITask } from '../../types/todoTypes';
import Preloader from '../Preloader/Preloader';

type Props = RouteComponentProps<{ todoListId: string }>;

const TodoList: React.FC<Props> = props => {
  const dispatch = useDispatch();

  const { tasks, tasksCount, tasksFetching } = useSelector(
    (s: RootState) => s.todo
  );

  const todoListId = props.match.params.todoListId;
  const completedTasks = tasks.filter(task => task.status === 1);
  const inProgressTasks = tasks.filter(task => task.status === 0);

  const [taskTitle, setTaskTitle] = useState('');
  const [currentTask, setCurrentTask] = useState<ITask | null>(null);
  const [taskError, setTaskError] = useState<
    'Title is required' | `Max title length is 100 symbols` | null
  >(null);

  const onTaskCreate = () => {
    if (taskTitle) {
      if (taskTitle.length > 100) {
        setTaskError(`Max title length is 100 symbols`);
      } else {
        dispatch(addNewTask(todoListId, taskTitle));
        setTaskTitle('');
      }
    } else {
      setTaskError('Title is required');
    }
  };

  const onDropOnBoard = (e: React.DragEvent<HTMLDivElement>, status: 0 | 1) => {
    e.preventDefault();

    if (currentTask) {
      if (currentTask.status !== status) {
        dispatch(
          updateTask(todoListId, currentTask.id, {
            ...currentTask,
            status: status,
          })
        );
      }
    }
  };

  useEffect(() => {
    dispatch(getTodoListTasks(todoListId));
  }, [todoListId, dispatch]);

  useEffect(() => {
    if (taskError) {
      if (taskError === 'Title is required' && taskTitle.length > 0) {
        setTaskError(null);
      } else if (
        taskError === 'Max title length is 100 symbols' &&
        taskTitle.length <= 100
      ) {
        setTaskError(null);
      }
    }
  }, [taskError, taskTitle]);

  return (
    <div className={css.todoList}>
      <div
        className={css.inProgress}
        onDragOver={e => {
          e.preventDefault();
        }}
        onDrop={e => {
          onDropOnBoard(e, 0);
        }}
      >
        <div className={css.inProgressTitle}>
          <span>💻 In Progress</span>
        </div>
        <div className={css.createTask}>
          <span
            className={css.createTaskIcon}
            onClick={onTaskCreate}
            title='Create task'
          >
            📝
          </span>
          {taskError && (
            <div className={css.taskError}>
              <span>{taskError}</span>
            </div>
          )}

          <input
            type='text'
            placeholder='Add task'
            value={taskTitle}
            onChange={e => setTaskTitle(e.currentTarget.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') onTaskCreate();
            }}
            onBlur={() => setTaskError(null)}
          />
        </div>
        <div className={css.tasks}>
          {tasksFetching ? (
            <div className={css.preloader}>
              <Preloader size='35px' color='#fff' />
            </div>
          ) : (
            <>
              {inProgressTasks.length > 0 ? (
                inProgressTasks.map(task => (
                  <Task
                    currentTask={currentTask}
                    setCurrentTask={setCurrentTask}
                    task={task}
                    tasks={tasks}
                    key={task.id}
                  />
                ))
              ) : (
                <div className={css.noTasks}>
                  {tasksCount && completedTasks.length === tasksCount ? (
                    <span>All tasks completed 🎉</span>
                  ) : (
                    <span>No tasks yet</span>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <div
        className={css.completed}
        onDragOver={e => {
          e.preventDefault();
        }}
        onDrop={e => {
          onDropOnBoard(e, 1);
        }}
      >
        <div className={css.completedTitle}>
          <span>🚀 Done</span>
        </div>
        <div className={css.tasks}>
          {tasksFetching ? (
            <div className={css.preloader}>
              <Preloader size='35px' color='#fff' />
            </div>
          ) : (
            <>
              {completedTasks.length > 0 ? (
                completedTasks.map(task => (
                  <Task
                    currentTask={currentTask}
                    setCurrentTask={setCurrentTask}
                    task={task}
                    tasks={tasks}
                    key={task.id}
                  />
                ))
              ) : (
                <div className={css.noTasks}>
                  <span>No completed tasks yet</span>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default withRouter(TodoList);
