import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';

import {
  Box,
  Modal,
  Button,
  TextField,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Save } from '@mui/icons-material';

import FileUploader from '../FileUploader/FileUploader';
import { addNewsValidationSchem } from '../../constants/schems';
import { addNewsRequested } from '../../redux/actions/newsAction';

import localStyle from './ModalAddNews.module.css';

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

export default function ModalAddNews() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.news.loading);
  const error = useSelector((state) => state.news.error);

  const [img, setImg] = useState(null);
  // modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // formik
  const addNewsFields = [
    { name: 'title', label: 'Title' },
    { name: 'text', label: 'Text' },
    { name: 'tag', label: 'Tag' },
  ];

  const initialValues = {
    title: '',
    text: '',
    tag: '',
  };

  const formik = useFormik({
    initialValues,
    validationSchema: addNewsValidationSchem,
    onSubmit: (values) => {
      dispatch(addNewsRequested({ data: values, img }));
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
      <Button variant="contained" onClick={handleOpen}>Add news</Button>
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
            <h2 className={localStyle.title_modal}>Add news</h2>
            <div className={localStyle.list_inputs}>
              <div className={localStyle.form__text_fields}>
                {
                  addNewsFields.map(({ name, label }) => (
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
                formik.resetForm(formik.initialValues);
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
