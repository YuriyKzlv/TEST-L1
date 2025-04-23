import React from 'react';
import PropTypes from 'prop-types';

import styles from './Error.module.css';

function Error({ error }) {
  return (
    <div className={styles.danger}>
      Error!
      {error}
    </div>
  );
}

Error.propTypes = {
  error: PropTypes.string.isRequired,
};

export default Error;
