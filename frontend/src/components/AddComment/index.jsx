import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import authHeader from "../../services/auth-header";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

const defaultValues = {
  body: ""
}

const AddComment = ({ id }) => {
  const [errors, setErrors] = useState(defaultValues);
  let navigate = useNavigate();

  const validate = (formValues) => {
    let tempValues = {...errors};
    for (var pair of formValues.entries()){
        if (pair[0] === 'body') {
            tempValues.body = pair[1] ? "" : "Enter comment body"; 
        }
    }
    setErrors({
        ...tempValues,
    });

    // If all elements are "", then no errors were found
    return Object.values(tempValues).every((x) => x === "");
}

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    if (validate(data)) {
      axios.post(`http://localhost:8000/api/restaurants/${id}/addcomment/`, {
        body: data.get("body"),
      }, {
        headers: authHeader()
      })
      .then((res) => {
        navigate(`/restaurant/${id}/`)
      })
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    var data = new FormData();
    data.set(name, value)
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
      <Grid container alignItems="center" justifyItems="center">
        <Grid item xs={12}>
          <TextField
            margin="normal"
            id="body-input"
            name="body"
            type="text"
            label="Body"
            multiline
            rows={6}
            fullWidth
            placeholder="Enter your comment."
            onChange={handleChange}
            error={errors.body !== ''}
            helperText={errors.body}
            autoComplete="body"
          />
        </Grid>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          fullWidth
          sx={{ mt: 3, mb: 3 }}
          style={{ backgroundColor: '#f75000' }}
        >
          Post Comment
        </Button>
      </Grid>
    </Box>
  );
}

export default AddComment;
