import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { Drawer } from '@mui/material';
import { useState } from 'react';
import { clickLogout } from "../loginAuthenticaton/loginAuthReducer";
import { useDispatch } from "react-redux";



const ResponsiveAppBar = (props) => {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [logout_state] = useState(true);
  const dispatch = useDispatch();

  
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };  

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    dispatch(clickLogout(logout_state));
  }



  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={() => setIsDrawerOpen(true)}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>

            <Drawer anchor='left' open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
              <Box sx={{ width: 250 }}>
                <Button
                  onClick={props.goToLogin}
                  sx={{ my: 2, display: 'block' }}
                >
                  HOME
                </Button>
                <Button
                  onClick={props.goToLibrary}
                  sx={{ my: 2, display: 'block' }}
                >
                  Library
                </Button>
                <Button
                  onClick={props.goToStudentList}
                  sx={{ my: 2, display: 'block' }}>Student-list</Button>

              </Box>
            </Drawer>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button
              onClick={props.goToLogin}
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              HOME
            </Button>
            <Button
              onClick={props.goToLibrary}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              Library
            </Button>
            <Button
              onClick={props.goToStudentList}
              sx={{ my: 2, color: 'white', display: 'block' }}>Student-list</Button>

          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >

              <MenuItem >
                <Button onClick={handleLogout}>Logout</Button>
              </MenuItem>

            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
