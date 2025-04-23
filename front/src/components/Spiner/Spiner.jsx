import React from 'react';

import circle from '../../assets/spiner.gif';

import styles from './Spiner.module.css';

function Spiner() {
  return (
    <div className={styles.wrapper}>
      <img src={circle} alt="loading..." />
    </div>
  );
}

export default Spiner;
