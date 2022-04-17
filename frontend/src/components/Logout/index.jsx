import React from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../../services/auth.service";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const Login = () => {

    const handleClick = (e) => {
        AuthService.logout();
    }

    return (

        <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            sx={{ mt: 3, mb: 2 }}
            style={{backgroundColor: '#f78c25'}}
            onClick={handleClick}
        >
                Logout
        </Button>

    );
}


export default Login;