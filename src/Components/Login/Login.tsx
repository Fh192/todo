import React, { useState } from 'react';
import css from './Login.module.css';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../store/reducers/authReducer';

const LoginValidateSchema = Yup.object().shape({
  email: Yup.string().email('Incorrect email').required('Field is required'),
  password: Yup.string().required('Field is required'),
});

interface LoginFormValues {
  email: string;
  password: string;
  rememberMe: boolean;
  captcha: string;
}

const Login: React.FC = () => {
  const dispatch = useDispatch();

  const captchaURL = useSelector((s: RootState) => s.auth.captchaURL);
  const [btnDisabled, setBtnDisabled] = useState(false);

  return (
    <div className={css.login}>
      <Formik
        initialValues={{
          email: '',
          password: '',
          rememberMe: false,
          captcha: '',
        }}
        validationSchema={LoginValidateSchema}
        onSubmit={(values: LoginFormValues, actions) => {
          setBtnDisabled(true);
          dispatch(login(values));
          actions.setFieldValue('captcha', '');
        }}
        validateOnMount={true}
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
            {captchaURL ? (
              <div className={css.captcha}>
                <div>
                  <img src={captchaURL} alt='captcha' />
                </div>

                <Field
                  type='text'
                  name='captcha'
                  id='captcha'
                  placeholder='Enter captcha'
                  className={css.captchaField}
                />
              </div>
            ) : null}

            <button
              type='submit'
              className={css.submitBtn}
              disabled={btnDisabled}
            >
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
