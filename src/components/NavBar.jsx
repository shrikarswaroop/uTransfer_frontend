import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import { MenuItem } from '@mui/material';
import { Typography } from '@mui/material';
import ActionIndexContext from '../contexts/ActionIndexContext';
import Divider from '@mui/material/Divider';

function NavBar({ loggedIn }) {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const { setActionIndex } = React.useContext(ActionIndexContext);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const pages = ['Add Device', 'Login', 'Sign Up'];
  const settings = [
    {
      name: window.sessionStorage.getItem('userId')
    },
    {
      name: 'Change Device',
      callback: () => { }
    },
    {
      name: 'Logout',
      callback: () => {
        window.sessionStorage.removeItem('userId');
        window.sessionStorage.removeItem('deviceId');
        window.dispatchEvent(new Event("logout"));
        handleCloseUserMenu();
      }
    }
  ];

  return (
    <AppBar position="static" sx={{ backgroundColor: '#0192BF' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} height={50}>
            <img src='logo.png' height='100%' alt="app logo" />
          </Box>
          {!loggedIn &&
            <Box sx={{ flexGrow: 10, display: { xs: 'flex', md: 'none' } }}>
              <Box sx={{ display: { xs: 'flex', md: 'none' }, ml: 'auto', mr: 'auto' }} height={50}>
                <img src='logo.png' height='100%' alt="app logo" />
              </Box>
            </Box>
          }
          {loggedIn &&
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <Box sx={{ display: { xs: 'flex', md: 'none' }, ml: 'auto', mr: 'auto' }} height={50}>
                <img src='logo.png' height='100%' alt="app logo" />
              </Box>
            </Box>
          }
          {!loggedIn &&
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, flexDirection: 'row-reverse' }}>
              {pages.map((page, index) => (
                <Button
                  key={page}
                  sx={{ mx: 1, my: 2, color: '#C7F2FF', display: 'block', fontWeight: 'bold', fontSize: 16 }}
                  onClick={() => { setActionIndex(index) }}
                >
                  {page}
                </Button>
              ))}
            </Box>
          }

          {loggedIn &&
            <Box sx={{
              flexGrow: 1
            }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, float: 'right' }}>
                  <Avatar alt={window.sessionStorage.getItem('userId')} src="/static/images/avatar/2.jpg" />
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
                {settings.slice(0, 1).map((setting, index) => {
                  return (
                    <MenuItem key={setting.name}>
                      <Typography textAlign="center">User ID : <span style={{ color: '#0192BF', fontWeight: 'bold' }}>{setting.name}</span></Typography>
                    </MenuItem>
                  )
                })}
                <Divider key='divider' variant='middle' />
                {settings.slice(1).map((setting, index) => {
                  return (
                    <MenuItem key={setting.name} onClick={setting.callback}>
                      <Typography textAlign="center">{setting.name}</Typography>
                    </MenuItem>
                  );
                })}
              </Menu>
            </Box>
          }
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;