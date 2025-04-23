import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import _ from 'lodash';

import {
  Box,
  Modal,
  Button,
  TextField,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Save } from '@mui/icons-material';

import FileUploader from '../FileUploader/FileUploader';
import { editProfileValidationSchem } from '../../constants/schems';
import { editProfile } from '../../redux/actions/usersAction';

import localStyle from './ModalEditProfile.module.css';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  border: '1px solid #0076cd',
  boxShadow: 24,
  p: 4,
};

export default function ModalEditProfile() {
  const dispatch = useDispatch();
  const {
    login,
    email,
    firstName,
    lastName,
    loading,
    error,
  } = useSelector((state) => state.auth);
  const [img, setImg] = useState(null);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const editProfileFields = [
    {
      name: 'firstName',
      label: 'First name',
    }, {
      name: 'lastName',
      label: 'Last name',
    }, {
      name: 'email',
      label: 'Email',
    }, {
      name: 'login',
      label: 'Login',
    },
  ];

  const initialValues = {
    firstName,
    lastName,
    login,
    email,
  };

  const formik = useFormik({
    initialValues,
    validationSchema: editProfileValidationSchem,
    onSubmit: (values) => {
      const validValues = _.omitBy(values, (el) => el === '');
      dispatch(editProfile({ data: validValues, img }));
    },
  });

  useEffect(() => {
    if (!error && !loading) {
      handleClose();
      formik.resetForm(initialValues);
    }
  }, [error, loading]);

  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>Edit information</Button>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <form
            className={localStyle.list_list}
            onSubmit={formik.handleSubmit}
          >
            <h2 className={localStyle.title_modal}>Edit profile</h2>
            <div className={localStyle.list_inputs}>
              <div className={localStyle.form__text_field}>
                {
                  editProfileFields.map(({
                    name,
                    label,
                  }) => (
                    <div key={name} className={localStyle.list_item}>
                      <TextField
                        variant="outlined"
                        name={name}
                        className={localStyle.textarea}
                        label={label}
                        style={{ width: 500 }}
                        value={formik.values[name]}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {
                        (formik.errors[name] && formik.touched[name])
                          && <div className={localStyle.form__error}>{formik.errors[name]}</div>
                      }
                    </div>
                  ))
                }
              </div>
              <FileUploader
                setImg={setImg}
                format=".jpg, .jpeg, .png"
                preview
              />
            </div>
            <LoadingButton
              className={localStyle.button_submit}
              disabled={!formik.isValid}
              size="small"
              color="secondary"
              type="submit"
              loading={loading}
              loadingPosition="start"
              startIcon={<Save />}
              variant="contained"
            >
              Save news
            </LoadingButton>
            <Button
              onClick={() => {
                formik.resetForm(initialValues);
                handleClose();
              }}
              className={localStyle.button_delete}
              variant="outlined"
            >
              close
            </Button>
            {
              error !== '' ? <div className={localStyle.form__error}>{error}</div>
                : null
            }
          </form>
        </Box>
      </Modal>
    </div>
  );
}
