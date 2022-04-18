import React from "react";
import axios from 'axios';
import { useEffect } from 'react';
import authHeader from "../../services/auth-header";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from "@mui/material/Typography";
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import NotificationsIcon from '@mui/icons-material/Notifications';

export default function NotificationList() {
  const [anchorElNotif, setAnchorElNotif] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [notifications, setNotifications] = React.useState([]);

  const handleOpenNotifMenu = (event) => {
    setAnchorElNotif(event.currentTarget);
  };

  const handleCloseNotifMenu = () => {
    setAnchorElNotif(null);
  };

  const handleClickNotif = (id) => {
    fetch(`http://localhost:8000/api/accounts/notification/${id}/`, {
        method: 'DELETE',
        headers: authHeader()
    })
    .then(response => {
      setLoading(true)
    })
  }

  useEffect(() => {
    axios.get("http://localhost:8000/api/accounts/notifications", {
        headers: authHeader()
    })
    .then(response => {
      setLoading(false) 
      setNotifications(response.data.results)
    })
    .catch(err => setLoading(false)); 
  }, [loading])

  if (loading) {
    return (
      <>
        <Tooltip title="View notifications">
          <IconButton
            size="large"
            aria-label="notifications"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNotifMenu}
            color="inherit"
          >
            <NotificationsIcon sx={{ width: '1.5em', height: '1.5em' }}/>
          </IconButton>
        </Tooltip>

        <Menu
          sx={{ mt: '55px' }}
          id="menu-appbar"
          anchorEl={anchorElNotif}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorElNotif)}
          onClose={handleCloseNotifMenu}
        >

          <MenuItem onClick={handleCloseNotifMenu}>
            <Typography variant="h6" color="black" sx={{ textDecoration: 'none' }}>
              Loading Notifications...
            </Typography>
          </MenuItem>

        </Menu>
      </>
    );
  }

  return (
    <>
      <Tooltip title="View notifications">
        <IconButton
          size="large"
          aria-label="notifications"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleOpenNotifMenu}
          color="inherit"
        >
          <NotificationsIcon sx={{ width: '1.5em', height: '1.5em' }}/>
        </IconButton>
      </Tooltip>

      <Menu
        sx={{ mt: '55px' }}
        id="menu-appbar"
        anchorEl={anchorElNotif}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElNotif)}
        onClose={handleCloseNotifMenu}
      >

        {(notifications.length === 0 ? 
          <MenuItem>
            <Typography variant="p" color="black" sx={{ textDecoration: 'none' }}>
              You have no notifications
            </Typography>
          </MenuItem> : 
          notifications.map(notif => (
            <MenuItem key={ notif.id } onClick={() =>  handleClickNotif(notif.id) }>
              <Typography variant="p" color="black" sx={{ textDecoration: 'none' }}>
                { notif.content }
              </Typography>
            </MenuItem>
        )))}

      </Menu>
    </>
  );
}
