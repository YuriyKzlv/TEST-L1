import React, { memo } from 'react';

import Body from '../../components/Body/Body';
import Header from '../../components/Header/Header';
import withAuthRedirect from '../../HOC/withAuthentication';

function MainPage() {
  return (
    <>
      <Header />
      <Body />
    </>
  );
}

export default memo(withAuthRedirect(MainPage));
