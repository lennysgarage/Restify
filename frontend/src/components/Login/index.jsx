import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../../services/auth.service";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const defaultValues = {
    email: "",
    password: ""
}

const Login = () => {
    const [errors, setErrors] = useState(defaultValues);

    const validate = (formValues) => {
        let tempValues = {...errors};
        for (var pair of formValues.entries()){
            if (pair[0] === 'email') {
                tempValues.email = /^(?!.*\.{2})(?!.*-$)[^\.][a-zA-Z0-9!#$%&'*+/=?`{|}~^_.-]+[^\.]@[^\-][a-zA-Z0-9.-]+$/.test(pair[1])
                    ? "" : "Enter a valid email address";
            }
            if (pair[0] === 'password') {
                tempValues.password = pair[1].length > 8 ? "" : "Password must be atleast 8 characters";
            }
        }
        setErrors({
            ...tempValues,
        });

        // If all elements are "", then no errors were found
        return Object.values(tempValues).every((x) => x === "");
    }


    let navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        if (validate(data)) {
            AuthService.login(data.get('email'), data.get('password'))
                .then((res) => {
                    if (res.status === 401){
                        setErrors({
                            email: "Email or password is incorrect",
                            password: "Email or password is incorrect"});
                    } else {
                        navigate('/');
                    }
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
                        onChange={handleChange}
                        error={errors.email !== ''}
                        helperText={errors.email}
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
                        onChange={handleChange}
                        error={errors.password !== ''}
                        helperText={errors.password}
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
                    Login
                </Button>
            </Grid>
        </Box>
    );
}


export default Login;