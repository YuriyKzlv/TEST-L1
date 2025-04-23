import * as Yup from 'yup';

const password = Yup.string()
  .min(6, 'Minimum 6 characters!')
  .required('Required field!');

const login = Yup.string()
  .min(5, 'Minimum 5 characters!')
  .required('Required field!');

const email = Yup.string()
  .email('Wrong format!')
  .required('Required field!');

const firstName = Yup.string()
  .min(2, 'Minimum 2 characters!')
  .required('Required field!');

const lastName = Yup.string()
  .min(3, 'Minimum 3 characters!')
  .required('Required field!');

export const registrationValidationSchem = Yup.object({
  email,
  firstName,
  lastName,
  login,
  password,
});

export const loginValidationSchem = Yup.object({
  login,
  password,
});

export const addNewsValidationSchem = Yup.object({
  title: Yup.string()
    .min(5, 'Minimum 5 characters!')
    .max(50, 'Maximum 50 characters!')
    .required('Required field!'),
  text: Yup.string()
    .min(10, 'Minimum 10 characters!')
    .max(255, 'Maximum 255 characters!')
    .required('Required field!'),
  tag: Yup.string()
    .min(3, 'Minimum 3 characters!')
    .max(50, 'Maximum 50 characters!'),
});

export const editProfileValidationSchem = Yup.object({
  email,
  firstName,
  lastName,
  login,
});
