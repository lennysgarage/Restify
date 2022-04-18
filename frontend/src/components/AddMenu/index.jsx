import React from "react";
import { useNavigate } from "react-router-dom";
import authHeader from "../../services/auth-header";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

const AddMenu = () => {

    let navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const input = document.querySelector('input[name="photo"]');
        const data = new FormData(e.currentTarget);
        data.append('photo', input.files[0]);
        fetch('http://localhost:8000/api/restaurants/addmenu/', {
            method: 'POST',
            body: data,
            headers: authHeader()
        })
            .then((res) => {
                navigate('/restaurant/')
            })
    }

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <Grid container alignItems="center" justifyItems="center">
                <Grid item xs={12}>
                    <TextField
                        margin="normal"
                        id="name-input"
                        name="name"
                        type="text"
                        label="Name"
                        placeholder="Enter the name of the menu item."
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
                        fullWidth
                        required
                        autoComplete="price"
                        autoFocus
                        step={0.01}
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
                        placeholder="Enter the description of your menu item."
                        required
                        autoComplete="description"
                    />
                </Grid>
                <Button
                    variant="contained"
                    component="label"
                    color="primary"
                    style={{backgroundColor: '#f78c25'}}
                    sx={{ mt: 2 }}
                >
                    Upload a Photo of the menu Item
                    <input
                        name="photo"
                        type="file"
                        required
                    />
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    fullWidth
                    sx={{ mt: 4 }}
                    style={{backgroundColor: '#f75000'}}
                >
                        Add Menu Item
                </Button>
            </Grid>
        </Box>
    );
}


export default AddMenu;