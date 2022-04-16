import React, {useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import authHeader from "../../services/auth-header";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

const AddBlog = ({ id }) => {

    let navigate = useNavigate();
    const [owner, setOwner] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        axios.post('http://localhost:8000/api/blogs/addblog/', {
            header: data.get("header"),
            subtext: data.get("subtext"),
            body: data.get("body"),
        },{
            headers: authHeader()
            })
        .then((res) => {
            console.log(id, res)
            navigate(`/restaurant/${id}/blog/}`)
        })
    }
    
    useEffect(() => {
        axios.get("http://localhost:8000/api/restaurants/myrestaurant/", {
            headers: authHeader()
            })
        .then(response => {
            if (response.data.id == id) {
                setOwner(true)
            }
        })
        .catch(err => err)
        
    }, [id])

    if (owner) {
        return (
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1}}>
                <Grid container alignItems="center" justifyItems="center">
                    <Grid item xs={12}>
                        <TextField
                            margin="normal"
                            id="header-input"
                            name="header"
                            type="text"
                            label="Header"
                            placeholder="Enter the title of your blog."
                            fullWidth
                            required
                            autoComplete="header"
                            autoFocus
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            margin="normal"
                            id="subtext-input"
                            name="subtext"
                            type="text"
                            label="Subtext"
                            placeholder="Enter your blog's subtex."
                            fullWidth
                            required
                            autoComplete="subtext"
                            autoFocus
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            margin="normal"
                            id="body-input"
                            name="body"
                            type="text"
                            label="Body"
                            multiline
                            fullWidth
                            placeholder="Enter the body of your Blog."
                            required
                            autoComplete="body"
                        />
                    </Grid>
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        fullWidth
                        sx={{ mt: 3, mb: 2 }}
                        style={{backgroundColor: '#f75000'}}
                    >
                            Add Blog
                    </Button>
                </Grid>
            </Box>
        );
    }
    else {
        return (
            <Grid container alignItems="center" justifyItems="center">
                <h1>You cannot add blogs to a restaurant you do not own.</h1>
            </Grid>
        )
    }

}


export default AddBlog;