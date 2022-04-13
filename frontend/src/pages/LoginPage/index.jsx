import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Login from "../../components/Login";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

export default function LoginPage() {
    
    return (
        <Container component="main" maxWidth="sm">
            <Box 
                sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
            >
            <Typography component="h1" variant="h5">
            Sign in
            </Typography>

                <Login/>
            </Box>
        </Container>
    );
}