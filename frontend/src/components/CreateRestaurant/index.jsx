import React from "react";
import { useNavigate } from "react-router-dom";
import authHeader from "../../services/auth-header";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import axios from "axios";

const CreateRestaurant = () => {

    let navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        axios.post('http://localhost:8000/api/restaurants/create/', {
            name: data.get('name'), 
            address: data.get('address'),
            postal_code: data.get('postal_code'),
            phone_number: data.get('phone_number'),
            country_code: data.get('country_code'),
            description: data.get('description'),
        }, {headers: authHeader()})
            .then((res) => {
                navigate('/restaurant/')
            })
    }

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1}}>
            <Grid container alignItems="center" justifyItems="center">
                <Grid item xs={12}>
                    <TextField
                        margin="normal"
                        id="name-input"
                        name="name"
                        type="text"
                        label="Name"
                        placeholder="Enter your restaurant's name."
                        fullWidth
                        required
                        autoComplete="name"
                        autoFocus
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        margin="normal"
                        id="address-input"
                        name="address"
                        type="text"
                        label="Adress"
                        placeholder="Enter your restaurant's address."
                        fullWidth
                        required
                        autoComplete="address"
                        autoFocus
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        margin="normal"
                        id="postal_code-input"
                        name="postal_code"
                        type="text"
                        label="Postal Code"
                        placeholder="Enter your restaurant's postal code."
                        fullWidth
                        required
                        autoComplete="postal_code"
                        autoFocus
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        margin="normal"
                        id="phone_number-input"
                        name="phone_number"
                        type="text"
                        label="Phone Number"
                        placeholder="Enter your restaurant's phone number."
                        fullWidth
                        required
                        autoComplete="phone_number"
                        autoFocus
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        margin="normal"
                        id="country_code-input"
                        name="country_code"
                        type="text"
                        label="Country Code"
                        placeholder="Enter your restaurant's country code."
                        fullWidth
                        required
                        autoComplete="country_code"
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
                        placeholder="Enter a description for your restaurant."
                        required
                        autoComplete="description"
                    />
                </Grid>
                <Button
                    variant="contained"
                    component="label"
                    color="primary"
                    name="logo"
                    style={{backgroundColor: '#f78c25'}}
                    sx={{ mt: 3, mb: 2 }}
                >
                    Upload Logo For Your Restaurant
                    <input
                        type="file"
                        hidden
                    />
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    fullWidth
                    sx={{ mt: 3, mb: 2 }}
                    style={{backgroundColor: '#f75000'}}
                >
                        Create Restaurant
                </Button>
            </Grid>
        </Box>
    );
}


export default CreateRestaurant;