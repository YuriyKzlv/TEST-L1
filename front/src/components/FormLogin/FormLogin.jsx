import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { TextField, Button } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';

import { loginUser, registrationGoogle } from '../../redux/actions/authAction';
import { loginValidationSchem } from '../../constants/schems';

import styles from './FormLogin.module.css';

export default function FormLogin() {
  const dispatch = useDispatch();

  const redirectGoogle = () => {
    dispatch(registrationGoogle());
  };
  const navigate = useNavigate();
  const { isAuth } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuth) {
      navigate('/');
    }
  }, [isAuth]);
  const loginFields = [
    { name: 'login', label: 'Login', type: 'text' },
    { name: 'password', label: 'Password', type: 'password' },
  ];

  const formik = useFormik({
    initialValues: {
      login: '',
      password: '',
    },
    validationSchema: loginValidationSchem,
    onSubmit: (values) => {
      dispatch(loginUser(values));
    },
  });

  return (
    <form className={styles.form} onSubmit={formik.handleSubmit}>
      <div className={styles.form__registration}>
        <h2 className={styles.form__title}>LOGIN</h2>
        <div className={styles.form__password}>
          {
            loginFields.map(({ name, label, type }) => (
              <div key={name}>
                <TextField
                  type={type}
                  label={label}
                  variant="outlined"
                  name={name}
                  value={formik.values[name]}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {
                    formik.errors[name] && formik.touched[name]
                      ? <div className={styles.form__error}>{formik.errors[name]}</div> : null
                  }
              </div>
            ))
          }
          <Button
            onClick={redirectGoogle}
            variant="contained"
            size="small"
          >
            <GoogleIcon />
            GOOGLE
          </Button>
          <Button disabled={!formik.isValid} type="submit" variant="outlined" size="large">
            login
          </Button>
        </div>
      </div>
    </form>
  );
}
