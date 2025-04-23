import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  CssBaseline,
  Container,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import { logoutUser } from '../../redux/actions/authAction';

function Header() {
  const token = localStorage.getItem('accessToken');
  const { isAuth, id } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const logout = () => { dispatch(logoutUser()); };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <CssBaseline />
        <Container maxWidth="xl">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Link to="/">News</Link>
            </Typography>
            <Button color="inherit">
              {
                isAuth && token ? <Link to={`/user/${id}`}>profile</Link>
                  : null
              }
            </Button>
            <Button color="inherit">
              {
                isAuth && token ? <Link onClick={logout} to="/login">logout</Link>
                  : <Link to="/login">login</Link>
              }
            </Button>
            {
              isAuth && token ? null
                : (
                  <Button color="inherit">
                    <Link to="/registration">registration</Link>
                  </Button>
                )
            }
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}

export default Header;
