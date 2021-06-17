import React, { useState } from 'react';
import css from './TodoList.module.css';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';

interface Props {
  id: string;
  addedDate: string;
  order: number | null;
  title: string;

  deleteTodoList: (todoListId: string) => void;
  updateTodoListTitle: (todoListId: string, title: string) => void;
}

const TodoList: React.FC<Props> = props => {
  const [editMode, setEditMode] = useState<boolean>(false);

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
          setEditMode(false);
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

  return (
    <div className={css.todoList}>
      <header className={css.header}>
        {editMode ? (
          <UpdateTitleForm />
        ) : (
          <div className={css.title} onDoubleClick={() => setEditMode(true)}>
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
      </header>
    </div>
  );
};

export default TodoList;
