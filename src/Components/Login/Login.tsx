import React from 'react';
import css from './Login.module.css';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const LoginValidateSchema = Yup.object().shape({
  email: Yup.string().email('Incorrect email').required('Field is required'),
  password: Yup.string().required('Field is required'),
});

interface LoginFormValues {
  email: string;
  password: string;
  rememberMe: boolean;
}

const Login: React.FC = () => {
  return (
    <div className={css.login}>
      <Formik
        initialValues={{
          email: '',
          password: '',
          rememberMe: false,
        }}
        validationSchema={LoginValidateSchema}
        onSubmit={(values: LoginFormValues) => {
          console.log(values);
        }}
      >
        {({ errors, touched, setFieldValue, setTouched }) => (
          <Form>
            <div className={css.title}>
              <span>Login</span>
            </div>
            <div className={css.inner}>
              {errors.email && touched.email ? (
                <label htmlFor='password' className={css.error}>
                  {errors.email}
                </label>
              ) : null}
              <Field
                type='email'
                name='email'
                placeholder='Email'
                id='email'
                className={css.email}
              />
            </div>

            <div className={css.inner}>
              {errors.password && touched.password ? (
                <label htmlFor='email' className={css.error}>
                  {errors.password}
                </label>
              ) : null}

              <Field
                type='password'
                name='password'
                placeholder='Password'
                id='password'
                className={css.password}
              />
            </div>

            <div className={css.row}>
              <Field
                type='checkbox'
                name='rememberMe'
                id='rememberMe'
                className={css.rememberMe}
              />
              <label htmlFor='rememberMe'>Remember me</label>
            </div>

            <button type='submit' className={css.submitBtn}>
              LOGIN
            </button>

            <div
              className={css.useTempAcc}
              onClick={() => {
                setFieldValue('email', 'free@samuraijs.com');
                setFieldValue('password', 'free');
                setTouched({ email: false, password: false });
              }}
            >
              <span>Use template account</span>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
