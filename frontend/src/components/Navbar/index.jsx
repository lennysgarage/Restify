import React from "react";
import axios from 'axios';
import {useEffect, useState} from 'react';
import authHeader from "../../services/auth-header";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from '@mui/material/IconButton';
import Button from "@mui/material/Button";
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import Menu from '@mui/material/Menu';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Container from '@mui/material/Container';
import { Link } from "react-router-dom";

export default function Navbar() {
  // const [anchorEl, setAnchorEl] = React.useState(null);

  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  // return (
  //   <Box sx={{ flexGrow: 1 }}>
  //     <AppBar sx={{backgroundColor: '#f78c25'}}>
  //       <Toolbar>
  //         <Typography component={Link} to="/" variant="h4" color="white" sx={{ textDecoration: 'none', paddingRight: '1rem' }}>
  //           Restify
  //         </Typography>
  //         <div>
            
  //           <Typography component={Link} to="/feed" variant="h5" color="white" sx={{ textDecoration: 'none' }}>
  //             Feed
  //           </Typography>
  //           <Typography component={Link} to="/login" variant="h5" color="white" sx={{ textDecoration: 'none' }}>
  //             Log Out
  //           </Typography>
  //           <Typography component={Link} to="/restaurant" variant="h5" color="white" sx={{ textDecoration: 'none' }}>
  //             My Restaurant
  //           </Typography>

  //           <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} sx={{ color: "#ffffff", textTransform: 'none' }}>
  //             <Typography variant="h5" color="white" sx={{ textDecoration: 'none' }}>
  //               Profile
  //             </Typography>
  //           </Button>
            
  //           <Menu
  //             id="simple-menu"
  //             anchorEl={anchorEl}
  //             keepMounted
  //             open={Boolean(anchorEl)}
  //             onClose={handleClose}
  //           >
  //             <MenuItem onClick={handleClose}>
  //               <Typography component={Link} to="/profile" variant="p" color="black" sx={{ textDecoration: 'none' }}>
  //                 View Profile
  //               </Typography>
  //             </MenuItem>
  //             <MenuItem onClick={handleClose}>
  //               <Typography component={Link} to="/profile" variant="p" color="black" sx={{ textDecoration: 'none' }}>
  //                 Edit Profile
  //               </Typography>
  //             </MenuItem>

  //           </Menu>

  //         </div>
  //       </Toolbar>
  //     </AppBar>
  //   </Box>
  // );
  
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

  useEffect(() => {
    axios.get("http://localhost:8000/api/accounts/profile/view", {
        headers: authHeader()
        })
    .then(response => setStatus(response.status))
    .catch(err => setStatus(err.response.status))
})

if (status === 200) {
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

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
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

              <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block', textTransform: 'none'}}
                >
                <Typography variant="h5" color="white" sx={{ textDecoration: 'none' }}>
                  Notifications
                </Typography>
              </Button>

            </Box>

            <Box sx={{ flexGrow: 0 }}>
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

                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography component={Link} to="/login" variant="h6" color="black" sx={{ textDecoration: 'none' }}>
                    Logout
                  </Typography>
                </MenuItem>

              </Menu>
            </Box>

          </Toolbar>
        </Container>
      </AppBar>
    );
  }
  else {
    return <h1> Hi</h1>
  }
}

