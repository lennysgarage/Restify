import React from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../../services/auth.service";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const Login = () => {

    let navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        AuthService.login(data.get('email'), data.get('password'))
            .then((res) => {
                navigate('/')
            });
    }

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1}}>
            <Grid container alignItems="center" justifyItems="center">
                <Typography variant="body1" sx={{ color: 'text.secondary' }}> 
                Need an account? <Link to="/register" >It's only a click away</Link>
                </Typography>
                <Grid item xs={12}>
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
                <Grid item xs={12}>
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
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    fullWidth
                    sx={{ mt: 3, mb: 2 }}
                    style={{backgroundColor: '#f78c25'}}
                >
                        Sign in
                </Button>
            </Grid>
        </Box>
    );
}


export default Login;