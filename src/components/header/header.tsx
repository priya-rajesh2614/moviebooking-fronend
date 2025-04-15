import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import UserContext from '../usercontext/usercontext'; // adjust path as needed
import { useNavigate } from 'react-router-dom';


function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const navigate = useNavigate(); 

  const handleBook = () => {
    navigate('/home')
  };

  const handleBook1 = () => {
    navigate('/admin')
  };

  
  const handleBook2 = () => {
    navigate('/ticket')
  };

  const { user } = React.useContext(UserContext);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <div className="headercontainer">
      <AppBar position="static">
        <Container
          maxWidth="xl"
          style={{
            background: 'linear-gradient(to left,hwb(334 0% 66%) 53%,rgb(0, 0, 0) 70%)',
            position: 'fixed',
            left: '0px',
            top: '0',
            zIndex: 10000,
          }}
        >
          <Toolbar disableGutters>
            <a href="/home"><img
              src="https://uploads.turbologo.com/uploads/design/preview_image/78373916/watermark_preview_image20250408-1-1lojkdi.png"
              style={{ borderRadius: '26px', height: '63px', marginRight: '-1px' }}
              alt="logo"
              
              
            /></a>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/home"
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
              BOOKITNOW
            </Typography>

            {/* Mobile Menu */}
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="open navigation menu"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{ display: { xs: 'block', md: 'none' } }}
              >
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">Movies</Typography>
                </MenuItem>

                {user?.isAdmin && (
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">Admin</Typography>
                  </MenuItem>
                )}

                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">Ticket</Typography>
                </MenuItem>
              </Menu>
            </Box>

            {/* Mobile Logo */}
            <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="#"
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              LOGO
            </Typography>

            {/* Desktop Menu */}
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Button onClick={handleBook} sx={{ my: 2, color: 'white', display: 'block' }}>
                Movies
              </Button>

              {user?.isAdmin && (
                <Button onClick={handleBook1} sx={{ my: 2, color: 'white', display: 'block' }}>
                  Admin
                </Button>
              )}

              <Button onClick={handleBook2} sx={{ my: 2, color: 'white', display: 'block' }}>
                Ticket
              </Button>
            </Box>

            {/* Avatar */}
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <>
                <span>Welcome {user?.username}</span>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, ml:1 }}>
                  <Avatar alt="User" src="/static/images/avatar/2.jpg" />
                </IconButton>
                </>
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
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">Profile</Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">Account</Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">Dashboard</Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}

export default Header;
