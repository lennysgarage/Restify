import React from "react";
import Box from "@mui/material/Box";
import Register from "../../components/Register";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

export default function RegisterPage() {
    
    return (
        <Container component="main" maxWidth="lg">
            <Box 
                sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
            >
            <Typography component="h1" variant="h3">
            Register
            </Typography>

                <Register/>
            </Box>
        </Container>
    );
}