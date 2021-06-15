import React from 'react';
import css from './Login.module.css';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const LoginValidateSchema = Yup.object().shape({
  email: Yup.string().email('Incorrect email').required('Field is required'),
  password: Yup.string()
    .min(8, 'Min length is 8')
    .required('Field is required'),
});

interface LoginFormValues {
  email: string;
  password: string;
  rememberMe: boolean;
}

const Login: React.FC = props => {
  return (
    <div className={css.login}>
      <Formik
        initialValues={{ email: '', password: '', rememberMe: false }}
        validationSchema={LoginValidateSchema}
        onSubmit={(values: LoginFormValues) => {
          console.log(values);
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <Field type='email' name='email' placeholder='Email' id='email' />
            {errors.password && touched.password ? (
              <div>{errors.password}</div>
            ) : null}
            <Field
              type='password'
              name='password'
              placeholder='Password'
              id='password'
            />
            <Field type='checkbox' name='rememberMe' id='rememberMe' />
            <label htmlFor='rememberMe'>Remember me</label>
            <button type='submit'>Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
