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

const pages = ['Add Device', 'Login', 'Sign Up'];
const settings = ['Change Device', 'Logout'];

function NavBar({ loggedIn }) {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const {setActionIndex} = React.useContext(ActionIndexContext);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

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
                  onClick={()=>{setActionIndex(index)}}
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
                  <Avatar alt="Jack Ryan" src="/static/images/avatar/2.jpg" />
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
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          }
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;