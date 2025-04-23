import React, { useState } from 'react';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';

import { TextField, Button } from '@mui/material/';
import GoogleIcon from '@mui/icons-material/Google';

import FileUploader from '../FileUploader/FileUploader';
import { registrationUser, registrationGoogle } from '../../redux/actions/authAction';
import { registrationValidationSchem } from '../../constants/schems';

import styles from './FormRegistration.module.css';

export default function FormRegistration() {
  const dispatch = useDispatch();
  const [img, setImg] = useState(null);

  const redirectGoogle = () => {
    dispatch(registrationGoogle());
  };

  const loginFields = [
    { name: 'firstName', label: 'First name', type: 'text' },
    { name: 'lastName', label: 'Last name', type: 'text' },
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'login', label: 'Login', type: 'text' },
    { name: 'password', label: 'Password', type: 'password' },
  ];
  const formik = useFormik({
    initialValues: {
      email: '',
      firstName: '',
      lastName: '',
      login: '',
      password: '',
    },
    validationSchema: registrationValidationSchem,
    onSubmit: (values) => {
      dispatch(registrationUser({ data: values, img }));
    },
  });
  return (
    <form className={styles.form} onSubmit={formik.handleSubmit}>
      <div className={styles.form__registration}>
        <h2 className={styles.form__title}>REGISTRATION</h2>
        <div className={styles.form__about}>
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
          <FileUploader
            setImg={setImg}
            format=".jpg, .jpeg, .png"
            preview={false}
          />
          <Button disabled={!formik.isValid} type="submit" variant="outlined" size="large">
            registration
          </Button>
        </div>
      </div>
    </form>
  );
}
