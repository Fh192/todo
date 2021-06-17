import React from 'react';
import css from './CreateTodoList.module.css';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { addNewTodoList } from '../../store/reducers/todoReducer';

const CreateTodoList: React.FC = () => {
  return (
    <div className={css.createTodoList}>
      <CreateTodoListFormConnected />
    </div>
  );
};

interface IValues {
  title: string;
}

interface FormProps {
  addNewTodoList: (title: string) => void;
}

const CreateTodoListForm: React.FC<FormProps> = ({ addNewTodoList }) => {
  const ValidateSchema = Yup.object().shape({
    title: Yup.string().max(100, 'Max length is 100 symbols'),
  });

  return (
    <Formik
      initialValues={{ title: '' }}
      validationSchema={ValidateSchema}
      onSubmit={(values: IValues, actions) => {
        addNewTodoList(values.title);
        actions.resetForm();
      }}
    >
      {({ errors, submitForm }) => (
        <Form>
          {errors.title && <div>{errors.title}</div>}

          <Field
            name='title'
            type='text'
            placeholder='Todo list title'
            className={css.title}
            autoComplete='off'
            onBlur={() => submitForm()}
          />
        </Form>
      )}
    </Formik>
  );
};

const CreateTodoListFormConnected = connect(null, { addNewTodoList })(
  CreateTodoListForm
);

export default CreateTodoList;
