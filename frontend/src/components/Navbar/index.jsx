import React from "react";
import axios from 'axios';
import { useEffect } from 'react';
import authHeader from "../../services/auth-header";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from '@mui/material/IconButton';
import Button from "@mui/material/Button";
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Container from '@mui/material/Container';
import AuthService from "../../services/auth.service";
import { Link, Navigate, useNavigate } from "react-router-dom";
import NotificationList from "../NotificationList";

export default function Navbar() {

  let navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [status, setStatus] = React.useState(0);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    AuthService.logout();
    setStatus(0);
    handleCloseUserMenu();
    navigate('/')
  };

  useEffect(() => {
    axios.get("http://localhost:8000/api/accounts/profile/view", {
        headers: authHeader()
        })
    .then(response => setStatus(response.status))
    .catch(err => setStatus(err.response.status))
  }, [status])

  if (status === 200) {
    return (
      <AppBar position="sticky" sx={{backgroundColor: '#f78c25'}}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>

            <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block', textTransform: 'none'}}
              >
              <Typography 
                  variant="h4"
                  noWrap
                  sx={{ textDecoration: 'none'}}
                  component={Link} 
                  to="/"
                  color="white" 
                >
                Restify
              </Typography>
            </Button>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="feed and restaurant"
                aria-controls="menu-appbar"
                aria-haspopup="true"
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
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >

                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography component={Link} to="/feed" variant="h6" color="black" sx={{ textDecoration: 'none' }}>
                    Feed
                  </Typography>
                </MenuItem>

                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography component={Link} to="/restaurant" variant="h6" color="black" sx={{ textDecoration: 'none' }}>
                    My Restaurant
                  </Typography>
                </MenuItem>

              </Menu>
            </Box>

            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>

              <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block', textTransform: 'none'}}
                >
                <Typography component={Link} to="/feed" variant="h5" color="white" sx={{ textDecoration: 'none' }}>
                  Feed
                </Typography>
              </Button>

              <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block', textTransform: 'none'}}
                >
                <Typography component={Link} to="/restaurant" variant="h5" color="white" sx={{ textDecoration: 'none' }}>
                  My Restaurant
                </Typography>
              </Button>

            </Box>

            <Box sx={{ flexGrow: 0 }}>

              <NotificationList />
              
              <Tooltip title="Open settings">
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenUserMenu}
                  color="inherit"
                >
                  <AccountCircle sx={{ width: '1.5em', height: '1.5em' }}/>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '55px' }}
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
                  <Typography component={Link} to="/profile" variant="h6" color="black" sx={{ textDecoration: 'none' }}>
                    View Profile
                  </Typography>
                </MenuItem>

                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography component={Link} to="/profile" variant="h6" color="black" sx={{ textDecoration: 'none' }}>
                    Edit Profile
                  </Typography>
                </MenuItem>

                <MenuItem onClick={handleLogout}>
                  <Typography variant="h6" color="black" sx={{ textDecoration: 'none' }}>
                    Logout
                  </Typography>
                </MenuItem>

              </Menu>

            </Box>

          </Toolbar>
        </Container>
      </AppBar>
    );
  } else {
    return (
      <AppBar position="static" sx={{backgroundColor: '#f78c25'}}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>

            <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block', textTransform: 'none'}}
              >
              <Typography 
                  variant="h4"
                  noWrap
                  sx={{ textDecoration: 'none'}}
                  component={Link} 
                  to="/"
                  color="white" 
                >
                Restify
              </Typography>
            </Button>

            <Box sx={{ flexGrow: 1 }}></Box>

            <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="register and log in"
                aria-controls="menu-appbar"
                aria-haspopup="true"
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
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >

                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography component={Link} to="/register" variant="h6" color="black" sx={{ textDecoration: 'none' }}>
                    Register
                  </Typography>
                </MenuItem>

                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography component={Link} to="/login" variant="h6" color="black" sx={{ textDecoration: 'none' }}>
                    Login
                  </Typography>
                </MenuItem>

              </Menu>
            </Box>

            <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>

              <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block', textTransform: 'none'}}
                >
                <Typography component={Link} to="/register" variant="h5" color="white" sx={{ textDecoration: 'none' }}>
                  Register
                </Typography>
              </Button>

              <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block', textTransform: 'none'}}
                >
                <Typography component={Link} to="/login" variant="h5" color="white" sx={{ textDecoration: 'none' }}>
                  Login
                </Typography>
              </Button>

            </Box>

          </Toolbar>
        </Container>
      </AppBar>
    );
  }
}
