import React, { useEffect, useState } from 'react';
import css from './TodoList.module.css';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import Task from './Task/Task';
import { ITask } from '../../../types/todoTypes';

interface Props {
  id: string;
  addedDate: string;
  order: number | null;
  title: string;
  tasks: Array<ITask>;

  deleteTodoList: (todoListId: string) => void;
  updateTodoListTitle: (todoListId: string, title: string) => void;
  addNewTask: (todoListId: string, title: string) => void;
  getTodoListTasks: (todoListId: string) => void;
}

const TodoList: React.FC<Props> = props => {
  const [titleEditMode, setTitleEditMode] = useState<boolean>(false);
  const [taskEditMode, setTaskEditMode] = useState<boolean>(false);

  const date = props.addedDate.split('T');

  const [year, month, day] = date[0].split('-');
  const [hour, minute] = date[1].split(':');

  const UpdateTitleForm: React.FC = () => {
    interface IValues {
      title: string;
    }

    const ValidateSchema = Yup.object().shape({
      title: Yup.string().max(100, 'Max length is 100 symbols'),
    });

    return (
      <Formik
        initialValues={{ title: '' }}
        validationSchema={ValidateSchema}
        onSubmit={(values: IValues, actions) => {
          props.updateTodoListTitle(props.id, values.title);
          actions.resetForm();
          setTitleEditMode(false);
        }}
      >
        {({ errors, submitForm }) => (
          <Form>
            {errors.title && <div>{errors.title}</div>}
            <Field
              name='title'
              type='text'
              placeholder='New todo list title...'
              onBlur={submitForm}
            />
          </Form>
        )}
      </Formik>
    );
  };

  const AddNewTask: React.FC = () => {
    interface IValues {
      title: string;
    }

    const ValidateSchema = Yup.object().shape({
      title: Yup.string().max(100, 'Max length is 100 symbols'),
    });

    return (
      <Formik
        initialValues={{ title: '' }}
        validationSchema={ValidateSchema}
        onSubmit={(values: IValues, actions) => {
          props.addNewTask(props.id, values.title);
          setTaskEditMode(false);
          actions.resetForm();
        }}
      >
        {({ errors, submitForm }) => (
          <Form>
            {errors.title && <div>{errors.title}</div>}
            <Field
              name='title'
              type='text'
              placeholder='Task title...'
              onBlur={submitForm}
            />
          </Form>
        )}
      </Formik>
    );
  };

  useEffect(() => props.getTodoListTasks(props.id), []);

  return (
    <div className={css.todoList}>
      <header className={css.header}>
        {titleEditMode ? (
          <UpdateTitleForm />
        ) : (
          <div
            className={css.title}
            onDoubleClick={() => setTitleEditMode(true)}
          >
            {props.title}
          </div>
        )}

        <div className={css.addedDate}>
          <div>{`${day}.${month}.${year}`}</div>
          <div>{`${hour}:${minute}`}</div>
        </div>
        <div
          className={css.deleteTodoList}
          onClick={() => props.deleteTodoList(props.id)}
        >
          <button>Delete Todo</button>
        </div>
        <div className={css.addTask} onClick={() => setTaskEditMode(true)}>
          {taskEditMode ? <AddNewTask /> : <button>Add Task</button>}
        </div>
      </header>
      <div className={css.tasks}>
        {props.tasks.map(task => {
          debugger;
          if (task.todoListId === props.id) {
            return <Task {...task} key={task.id} />;
          } else {
            return null;
          }
        })}
      </div>
    </div>
  );
};

export default TodoList;
