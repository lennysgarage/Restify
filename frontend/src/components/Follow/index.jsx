import React from "react";
import axios from 'axios';
import { useEffect } from 'react';
import authHeader from "../../services/auth-header";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

export default function Follow({ restaurantId, userId }) {

  const [isFollowed, setIsFollowed] = React.useState(false);

  const handleClick = () => {
    if (isFollowed) {
      handleUnfollow()
    } else {
      handleFollow()
    }
  }

  const handleFollow = () => {
    fetch(`http://localhost:8000/api/restaurants/${restaurantId}/follow/`, {
        method: 'POST',
        headers: authHeader()
    })
    .then(response => {
      setIsFollowed(true)
    })
  }

  const handleUnfollow = () => {
    fetch(`http://localhost:8000/api/restaurants/${restaurantId}/unfollow/`, {
        method: 'DELETE',
        headers: authHeader()
    })
    .then(response => {
      setIsFollowed(false)
    })
  }

  useEffect(() => {
    axios.get("http://localhost:8000/api/restaurants/followers/", {
        headers: authHeader()
    })
    .then(response => {
      response.data.results.forEach(follow => {
        if (follow.restaurant === parseInt(restaurantId) && follow.follower === parseInt(userId)) {
          setIsFollowed(true)
        }
      })
    })
  }, [])

  if (isFollowed) {
    return (
      <Button
        onClick={handleClick}
        variant="contained"
        color="primary"
        style={{backgroundColor: '#f78c25'}}
      >
        <Typography 
            variant="p"
            noWrap
            sx={{ textDecoration: 'none'}}
            color="white" 
          >
          Unfollow
        </Typography>
      </Button>
    )
  } else {
    return (
      <Button
        onClick={handleClick}
        variant="contained"
        color="primary"
        style={{backgroundColor: '#f78c25'}}
      >
        <Typography 
            variant="p"
            noWrap
            sx={{ textDecoration: 'none'}}
            color="white" 
          >
          Follow
        </Typography>
      </Button>
    )
  }

}
