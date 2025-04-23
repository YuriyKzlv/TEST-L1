import React from 'react';
import PropTypes from 'prop-types';

import localStyle from './FileUploader.module.css';

export default function FileUploader({ setImg, format, preview }) {
  const onSelectImageHandler = (event) => {
    if (event.target.files[0]) {
      setImg(event.target.files[0]);
    }
  };

  return (
    <div className={localStyle.form__images}>
      {
        preview
          && <img src="/defaultImage.jpg" alt="images" />
      }
      <input
        type="file"
        accept={format}
        id="inputGroupFile01"
        onChange={onSelectImageHandler}
      />
    </div>
  );
}

FileUploader.propTypes = {
  setImg: PropTypes.func.isRequired,
  format: PropTypes.string.isRequired,
  preview: PropTypes.bool.isRequired,
};
