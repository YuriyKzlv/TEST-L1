import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import {
  Button,
  CardActionArea,
  CardActions,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';

import style from './Post.module.css';

function Post({
  title,
  text,
  tag,
  author,
  authorId,
  image,
}) {
  return (
    <Card sx={{ width: 300 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={
            image
              ? `${process.env.REACT_APP_BASE_URL}/${image}`
              : '/defaultImage.jpg'
          }
          alt="photo"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {text}
          </Typography>
          <Typography color="tomato" gutterBottom variant="h5" component="div">
            {tag}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          <Link className={style.link} to={`/user/${authorId}`}>
            {author}
          </Link>
        </Button>
      </CardActions>
    </Card>
  );
}
Post.defaultProps = {
  image: '',
};

Post.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  authorId: PropTypes.number.isRequired,
  tag: PropTypes.string.isRequired,
  image: PropTypes.string,
};

export default memo(Post);
