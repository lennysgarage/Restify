import React from "react";
import axios from 'axios';
import { useEffect } from 'react';
import authHeader from "../../services/auth-header";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

export default function LikeBlog({ blogId, userId }) {

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
    fetch(`http://localhost:8000/api/blogs/${blogId}/like/`, {
        method: 'POST',
        headers: authHeader()
    })
    .then(response => {
      setNumLikes(numLikes + 1)
      setIsLiked(true)
    })
  }

  const handleUnlike = () => {
    fetch(`http://localhost:8000/api/blogs/${blogId}/unlike/`, {
        method: 'DELETE',
        headers: authHeader()
    })
    .then(response => {
      setNumLikes(numLikes - 1)
      setIsLiked(false)
    })
  }

  const checkIfUserLiked = () => {
    fetch(`http://localhost:8000/api/blogs/${blogId}/unlike/`, {
        method: 'DELETE',
        headers: authHeader()
    })
    .then(response => {
      if (response.status === 204) {
        setIsLiked(true)
        fetch(`http://localhost:8000/api/blogs/${blogId}/like/`, {
          method: 'POST',
          headers: authHeader()
        })
      }
    })
  }

  useEffect(() => {
    axios.get(`http://localhost:8000/api/blogs/blog/${blogId}/likes`, {
        headers: authHeader()
    })
    .then(response => {
      setNumLikes(response.data.count)
      checkIfUserLiked()
    })
  }, []);

  if (isLiked) {
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
