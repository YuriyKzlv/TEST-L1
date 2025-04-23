import React, { memo } from 'react';

import FormLogin from '../../components/FormLogin/FormLogin';
import Header from '../../components/Header/Header';

function LoginPage() {
  return (
    <>
      <Header />
      <FormLogin />
    </>
  );
}

export default memo(LoginPage);
