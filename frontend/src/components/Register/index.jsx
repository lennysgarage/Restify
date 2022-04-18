import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";


const API_URL = "http://localhost:8000/api/"

// Source for various validation parts: https://github.com/CodAffection/Material-UI-Form-Design-and-Validation

const defaultValues = {
    first_name: "",
    last_name: "",
    email: "",
    country_code: "",
    phone_number: "",
    password: "",
    password2: ""
}

const Register = () => {
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState(defaultValues);

    let navigate = useNavigate();

    const validate = (formValues) => {
        let tempValues = {...errors};
        for (var pair of formValues.entries()){
            if (pair[0] === 'first_name') {
                tempValues.first_name = pair[1] ? "" : "Enter your first name"; 
            }
            if (pair[0] === 'last_name') {
                tempValues.last_name = pair[1] ? "" : "Enter your last name"; 
            }
            if (pair[0] === 'email') {
                tempValues.email = /^(?!.*\.{2})(?!.*-$)[^\.][a-zA-Z0-9!#$%&'*+/=?`{|}~^_.-]+[^\.]@[^\-][a-zA-Z0-9.-]+$/.test(pair[1])
                    ? "" : "Enter a valid email address";
            }
            if (pair[0] === 'country_code') {
                tempValues.country_code = /^[a-zA-Z]{2,3}$/.test(pair[1]) ? "" : "Enter a valid country code (CA)";
            }
            if (pair[0] === 'phone_number') {
                tempValues.phone_number = /^\d{10}$/.test(pair[1])
                    ? "" : "Enter a phone number like 5555555555";
            }
            if (pair[0] === 'password') {
                tempValues.password = pair[1].length > 8 ? "" : "Password must be atleast 8 characters";
                setPassword(pair[1]);
            }
            if (pair[0] === 'password2') {
                tempValues.password2 = pair[1] && pair[1] === password ? "" : "Passwords do not match";
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
            // register request
            fetch(API_URL + 'accounts/register/', {
                method: 'POST',       
                body: data
            })
            .then((res) => { 
                res.json().then(data => {
                    if (data.status_code === 403) {
                        setErrors({
                            first_name: "",
                            last_name: "",
                            email: "Email already exists",
                            country_code: "",
                            phone_number: "",
                            password: "",
                            password2: ""})
                    } else {
                        navigate('/login')
                    }
                })
            });
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
            <Grid container alignItems="center" justifyItems="center" spacing={1}>
                <Grid item xs={12}>
                <Typography variant="body1" sx={{ color: 'text.secondary' }}> 
                    Already have an account? <Link to="/login" >Login here!</Link>
                </Typography>
                </Grid>
                <Grid item xs={6}>
                    <TextField
                            margin="normal"
                            id="fname-input"
                            name="first_name"
                            type="text"
                            label="First Name"
                            placeholder="Enter your first name."
                            fullWidth
                            onChange={handleChange}
                            error={errors.first_name !== ''}
                            helperText={errors.first_name}
                            autoFocus
                        />
                </Grid>
                <Grid item xs={6}>
                <TextField
                        margin="normal"
                        id="lname-input"
                        name="last_name"
                        type="text"
                        label="Last Name"
                        placeholder="Enter your last name."
                        fullWidth
                        onChange={handleChange}
                        error={errors.last_name !== ''}
                        helperText={errors.last_name}
                        autoFocus
                    />
                </Grid>
                <Grid item xs={6}>
                <TextField
                        margin="normal"
                        id="email-input"
                        name="email"
                        type="email"
                        label="Email"
                        placeholder="Enter your email address."
                        fullWidth
                        onChange={handleChange}
                        error={errors.email !== ''}
                        helperText={errors.email}
                        autoComplete="email"
                        autoFocus
                    />
                </Grid>
                <Grid item xs={2}>
                {/* change to dropdown box */}
                <TextField
                        margin="normal"
                        id="cc-input"
                        name="country_code"
                        type="text"
                        label="Country Code"
                        placeholder="Enter your country code."
                        fullWidth
                        onChange={handleChange}
                        error={errors.country_code !== ''}
                        helperText={errors.country_code}
                        autoFocus
                    />
                </Grid>
                <Grid item xs={4}>
                <TextField
                        margin="normal"
                        id="phone-input"
                        name="phone_number"
                        type="tel"
                        label="Phone Number"
                        placeholder="Enter your contact number."
                        fullWidth
                        onChange={handleChange}
                        error={errors.phone_number !== ''}
                        helperText={errors.phone_number}
                        autoFocus
                    />
                </Grid>
                <Grid item xs={6}>
                <TextField
                        margin="normal"
                        id="password-input"
                        name="password"
                        type="password"
                        label="Password"
                        placeholder="Enter your password."
                        fullWidth
                        onChange={handleChange}
                        error={errors.password !== ''}
                        helperText={errors.password}
                        autoComplete="current-pasword"
                    />
                </Grid>
                <Grid item xs={6}>
                <TextField
                        margin="normal"
                        id="password2-input"
                        name="password2"
                        type="password"
                        label="Confirm Password"
                        placeholder="Re-enter your password."
                        fullWidth
                        onChange={handleChange}
                        error={errors.password2 !== ''}
                        helperText={errors.password2}
                        autoComplete="current-pasword"
                    />
                </Grid>
                <Grid item xs={12}>
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    fullWidth
                    sx={{ mt: 3, mb: 2 }}
                    style={{backgroundColor: '#f78c25'}}
                >
                        Register
                </Button>
                </Grid>
            </Grid>
        </Box>
    );
}


export default Register;