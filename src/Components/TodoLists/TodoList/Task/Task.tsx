import React from 'react';
import { ITask } from '../../../../types/todoTypes';
import css from './Task.module.css';

const Task: React.FC<ITask> = props => {
  return (
    <div className={css.task}>
      <div className={css.title}>{props.title}//</div>
      {/* <div className={css.description}>{props.description}</div> */}
      {/* <div className={css.completed}>{props.completed}</div> */}
      {/* <div className={css.startDate}>{props.startDate}</div> */}
      {/* <div className={css.addedDate}>{props.addedDate}</div> */}
      {/* <div className={css.deadline}>{props.deadline}</div> */}
    </div>
  );
};

export default Task;
