import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import authHeader from "../../services/auth-header";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Divider from '@mui/material/Divider';
import { createBox } from '@mui/system';
import { Paper } from '@mui/material';
import { Alert } from '@mui/material';
import { InputAdornment, IconButton } from '@mui/material';

const API_URL = "http://localhost:8000/api/"


const defaultValues = {
    password: ""
}


export default function EditAccount(props) {
    const [success, setSuccess] = useState(false);
    const [errors, setErrors] = useState(defaultValues);
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);

    const validate = (formValues) => {
        let tempValues = {...errors};
        for (var pair of formValues.entries()){
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


    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        if (validate(data)) {
            fetch(API_URL + "accounts/profile/edit/", {
                method: 'PATCH',
                headers: authHeader(),
                body: data
            });
            setSuccess(true);
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        var data = new FormData();
        data.set(name, value)
        validate(data);
    }

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mb: 1 }}>
            {success && <Alert onClose={() => { setSuccess(false) }}>Account information updated!</Alert>}
            <Grid container spacing={2} alignItems="center" justifyItems="center" sx={{ p: 2 }}>
                <Grid item xs={6}>
                    <Typography sx={{textAlign: 'left', fontWeight: 'bold'}}>EMAIL:</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography>{props.data.email}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        margin="normal"
                        id="password-input"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        label="Password"
                        placeholder="Enter new password"
                        defaultValue=""
                        fullWidth
                        onChange={handleChange}
                        error={errors.password !== ''}
                        helperText={errors.password}
                        autoComplete="current-pasword"
                        // source: https://stackoverflow.com/a/60391397
                        InputProps={{ // <-- This is where the toggle button is added.
                            endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                >
                                {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                </IconButton>
                            </InputAdornment>
                            )
                        }}

                    />
                </Grid>
                <Grid item xs={12}>
                    <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        fullWidth
                    >
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            sx={{mb: 2, mt: 1}}
                            style={{backgroundColor: '#f75000'}}
                        >
                            Update Account Information
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}