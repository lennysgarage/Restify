import React from "react";
import axios from 'axios';
import { useEffect } from 'react';
import authHeader from "../../services/auth-header";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

export default function Like({ restaurantId, userId }) {

  const [isLiked, setIsLiked] = React.useState(false);
  const [numLikes, setNumLikes] = React.useState(0);

  const handleClick = () => {
    if (isLiked) {
      handleUnlike()
    } else {
      handleLike()
    }
  }

  const handleLike = () => {
    fetch(`http://localhost:8000/api/restaurants/${restaurantId}/like/`, {
        method: 'POST',
        headers: authHeader()
    })
    .then(response => {
      setNumLikes(numLikes + 1)
      setIsLiked(true)
    })
  }

  const handleUnlike = () => {
    fetch(`http://localhost:8000/api/restaurants/${restaurantId}/unlike/`, {
        method: 'DELETE',
        headers: authHeader()
    })
    .then(response => {
      setNumLikes(numLikes - 1)
      setIsLiked(false)
    })
  }

  useEffect(() => {
    axios.get("http://localhost:8000/api/restaurants/likes/", {
        headers: authHeader()
    })
    .then(response => {
      response.data.results.forEach(like => {
        if (like.restaurant === restaurantId) {
          setNumLikes(numLikes + 1)
          if (like.likedby === userId ) {
            setIsLiked(true)
          }
        }
      })
    })
  }, [])

  if (isLiked) {
    return (
      <Button
        onClick={handleClick}
        variant="contained"
        color="primary"
        sx={{ mt: 3, mb: 2 }}
        style={{backgroundColor: '#f78c25'}}
      >
        <Typography 
            variant="p"
            noWrap
            sx={{ textDecoration: 'none'}}
            color="white" 
          >
          Unlike: {numLikes}
        </Typography>
      </Button>
    )
  } else {
    return (
      <Button
        onClick={handleClick}
        variant="contained"
        color="primary"
        sx={{ mt: 3, mb: 2 }}
        style={{backgroundColor: '#f78c25'}}
      >
        <Typography 
            variant="p"
            noWrap
            sx={{ textDecoration: 'none'}}
            color="white" 
          >
          Like: {numLikes}
        </Typography>
      </Button>
    )
  }

}