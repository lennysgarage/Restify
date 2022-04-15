import React from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../../services/auth.service";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";


const API_URL = "http://localhost:8000/api/"


const Register = () => {

    let navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        // register request
        fetch(API_URL + 'accounts/register/', {
            method: 'POST',       
            body: data
        })
        .then((res) => { // maybe load a confirmation like alert then send???
            navigate('/login')
        })
    }


    

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1}}>
            <Grid container alignItems="center" justifyItems="center">
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
                            required
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
                        required
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
                        required
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
                        required
                        autoFocus
                    />
                </Grid>
                <Grid item xs={4}>
                <TextField
                        margin="normal"
                        id="phone-input"
                        name="phone_number"
                        type="tel"
                        label="Phone"
                        placeholder="Enter your contact number."
                        fullWidth
                        required
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
                        required
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
                        required
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