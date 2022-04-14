import React from "react";
import CheckRestaurant from "../../components/CheckRestaurant"
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";


export default function CreateRestaurantPage() {
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
            Create Your Restaurant
            </Typography>
            <CheckRestaurant />
            </Box>
        </Container>
    );


}