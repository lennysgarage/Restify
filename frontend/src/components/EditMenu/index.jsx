import React, {useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import authHeader from "../../services/auth-header";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

const EditMenu = ({ id }) => {

    let navigate = useNavigate();
    const [owner, setOwner] = useState(false);
    const [data, setData] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        fetch(`http://localhost:8000/api/restaurants/editmenu/${id}/`, {
            method: 'PATCH',
            body: data,
            headers: authHeader()
        })
        .then((res) => {
            navigate("/restaurant")
        })
    }

    const handlePhoto = (e) => {
        e.preventDefault();
        const input = document.querySelector('input[name="photo"]');
        const data = new FormData();
        data.append('photo', input.files[0]);
        fetch(`http://localhost:8000/api/restaurants/editmenu/${id}/`, {
            method: 'PATCH',
            body: data,
            headers: authHeader()
        })
        .then((res) => res)
    }
    
    useEffect(() => {
        axios.get(`http://localhost:8000/api/restaurants/menu/${id}/`, {
            headers: authHeader()
            })
        .then(response => {
            setData(response.data)
                setOwner(true)
        })
        .catch(err => err)   
    }, [id])

    if (owner) {
        return (
            <Box sx={{ mt: 1}}>
            <Button
            variant="contained"
            component="label"
            color="primary"
            style={{backgroundColor: '#f78c25'}}
            sx={{ mt: 3, mb: 2 }}
        >
            Change Photo of Menu Item 
            <input
                hidden
                name="photo"
                type="file"
                onChange={ handlePhoto }
            />
            </Button>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1}}>
            <Grid container alignItems="center" justifyItems="center">
                <Grid item xs={12}>
                    <TextField
                        margin="normal"
                        id="name-input"
                        name="name"
                        type="text"
                        label="Name"
                        placeholder={data.name}
                        defaultValue={data.name}
                        fullWidth
                        required
                        autoComplete="name"
                        autoFocus
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        margin="normal"
                        id="price-input"
                        name="price"
                        label="Price"
                        type="text"
                        placeholder={data.price}
                        defaultValue={data.price}
                        fullWidth
                        required
                        autoComplete="price"
                        autoFocus
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        margin="normal"
                        id="description-input"
                        name="description"
                        type="text"
                        label="Description"
                        multiline
                        fullWidth
                        placeholder={data.description}
                        defaultValue={data.description}
                        required
                        autoComplete="description"
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
                        Update Menu
                </Button>
            </Grid>
        </Box>
        </Box>
        );
    }
    else {
        return (
            <Grid container alignItems="center" justifyItems="center">
                <h1>You cannot edit a menu item you do not own.</h1>
            </Grid>
        )
    }

}


export default EditMenu;