import React, { useState } from 'react';
import { connect } from 'react-redux';
import { ITask, TaskFormData } from '../../types/todoTypes';
import css from './Task.module.css';
import {
  reorderTask,
  deleteTask,
  updateTask,
} from '../../store/reducers/todoReducer';
import DeleteIcon from '../SVG/DeleteIcon';

interface MapDispatchProps {
  reorderTask: (
    todoListId: string,
    taskId: string,
    putAfterItemId: string
  ) => void;
  deleteTask: (todoListId: string, taskId: string) => void;
  updateTask: (
    todoListId: string,
    taskId: string,
    taskFormData: TaskFormData
  ) => void;
}

interface OwnProps {
  task: ITask;
}

type Props = OwnProps & MapDispatchProps;

const Task: React.FC<Props> = props => {
  const task = props.task;

  const [flipped, setFlipped] = useState(false);
  const [deadline, setDeadline] = useState<string>(props.task.deadline || '');

  return (
    <div className={css.taskWrapper}>
      <div
        className={css.task}
        onMouseEnter={() => setFlipped(true)}
        onMouseLeave={() => setFlipped(false)}
      >
        {flipped ? (
          <>
            <div className={css.deadline}>
              <span>Deadline:</span>
              {props.task.deadline ? (
                <>
                  <input
                    className={css.deadlineInput}
                    type='date'
                    placeholder='Set deadline'
                    value={deadline.split('T')[0]}
                    onChange={e => {
                      setDeadline(e.target.value);

                      props.updateTask(props.task.todoListId, props.task.id, {
                        ...props.task,
                        deadline: e.target.value,
                      });
                    }}
                  />
                </>
              ) : (
                <>
                  <input
                    className={css.deadlineInput}
                    type='date'
                    placeholder='Set deadline'
                    value={deadline}
                    onChange={e => {
                      setDeadline(e.target.value);
                      props.updateTask(props.task.todoListId, props.task.id, {
                        ...props.task,
                        deadline: e.target.value,
                      });
                    }}
                  />
                </>
              )}
            </div>
            <div
              className={css.deleteTask}
              onClick={() => props.deleteTask(task.todoListId, task.id)}
            >
              <DeleteIcon size={'17px'} />
            </div>
          </>
        ) : (
          <>
            <div className={css.title}>{task.title}</div>
            <div
              className={css.deleteTask}
              onClick={() => props.deleteTask(task.todoListId, task.id)}
            >
              <DeleteIcon size={'17px'} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default connect(null, { reorderTask, deleteTask, updateTask })(Task);
