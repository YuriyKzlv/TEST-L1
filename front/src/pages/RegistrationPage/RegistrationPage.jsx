import React, { memo } from 'react';

import FormRegistration from '../../components/FormRegistration/FormRegistration';
import Header from '../../components/Header/Header';

function RegistrationPage() {
  return (
    <>
      <Header />
      <FormRegistration />
    </>
  );
}

export default memo(RegistrationPage);
