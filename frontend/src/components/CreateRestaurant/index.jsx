import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import authHeader from "../../services/auth-header";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";


const defaultValues = {
    name: "",
    address: "",
    postal_code: "",
    phone_number: "",
    country_code: "",
    description: ""
}

const CreateRestaurant = () => {
    const [errors, setErrors] = useState(defaultValues);

    let navigate = useNavigate();


    const validate = (formValues) => {
        let tempValues = {...errors};
        for (var pair of formValues.entries()){
            if (pair[0] === 'name') {
                tempValues.name = pair[1] ? "" : "Enter your restaurant's name"; 
            }
            if (pair[0] === 'address') {
                tempValues.address = pair[1] ? "" : "Enter your restaurant's address";
            }
            if (pair[0] === 'postal_code') {
                tempValues.postal_code = pair[1] ? "" : "Enter a valid postal code";
            }
            if (pair[0] === 'phone_number') {
                tempValues.phone_number = /^\d{10}$/.test(pair[1])
                ? "" : "Enter a phone number like 5555555555";
            }
            if (pair[0] === 'country_code') {
                tempValues.country_code = /^[a-zA-Z]{2,3}$/.test(pair[1]) ? "" : "Enter a valid country code (CA)";
            }
            if (pair[0] === 'description') {
                tempValues.description = pair[1] ? "" : "Enter your restaurant's description";
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
        const input = document.querySelector('input[name="logo"]');
        const data = new FormData(e.currentTarget);
        data.append('logo', input.files[0]);
        if (validate(data)) {
            fetch('http://localhost:8000/api/restaurants/create/', {
                method: 'POST',
                body: data,
                headers: authHeader()
            })
            .then((res) => {
                navigate('/restaurant/')
            })
        }
    }


    const handleChange = (e) => {
        const { name, value } = e.target;
        var data = new FormData();
        data.set(name, value)
        validate(data);
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
                        onChange={handleChange}
                        error={errors.name !== ''}
                        helperText={errors.name}
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
                        placeholder="Enter your restaurant's address."
                        fullWidth
                        onChange={handleChange}
                        error={errors.address !== ''}
                        helperText={errors.address}
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
                        onChange={handleChange}
                        error={errors.postal_code !== ''}
                        helperText={errors.postal_code}
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
                        onChange={handleChange}
                        error={errors.phone_number !== ''}
                        helperText={errors.phone_number}
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
                        onChange={handleChange}
                        error={errors.country_code !== ''}
                        helperText={errors.country_code}
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
                        onChange={handleChange}
                        error={errors.description !== ''}
                        helperText={errors.description}
                        autoComplete="description"
                    />
                </Grid>
                <Button
                    variant="contained"
                    component="label"
                    color="primary"
                    style={{backgroundColor: '#f78c25'}}
                    sx={{ mt: 3, mb: 2 }}
                >
                    Upload Logo For Your Restaurant
                    <input
                        name="logo"
                        accept="image/*"
                        type="file"
                        required
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