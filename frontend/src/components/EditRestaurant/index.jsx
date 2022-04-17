import React, {useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import authHeader from "../../services/auth-header";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

const EditRestaurant = ({ id }) => {

    let navigate = useNavigate();
    const [owner, setOwner] = useState(false);
    const [data, setData] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        fetch("http://localhost:8000/api/restaurants/edit/", {
            method: 'PATCH',
            body: data,
            headers: authHeader()
        })
        .then((res) => {
            navigate("/restaurant")
        })
    }
    
    useEffect(() => {
        axios.get("http://localhost:8000/api/restaurants/myrestaurant/", {
            headers: authHeader()
            })
        .then(response => {
            if (response.data.id == id) {
                setData(response.data)
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
                        id="address-input"
                        name="address"
                        type="text"
                        label="Address"
                        placeholder={data.address}
                        defaultValue={data.address}
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
                        placeholder={data.postal_code}
                        defaultValue={data.postal_code}
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
                        placeholder={data.phone_number}
                        defaultValue={data.phone_number}
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
                        placeholder={data.country_code}
                        defaultValue={data.country_code}
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
                        Update Restaurant
                </Button>
            </Grid>
        </Box>
        );
    }
    else {
        return (
            <Grid container alignItems="center" justifyItems="center">
                <h1>You cannot edit a restaurant you do not own.</h1>
            </Grid>
        )
    }

}


export default EditRestaurant;