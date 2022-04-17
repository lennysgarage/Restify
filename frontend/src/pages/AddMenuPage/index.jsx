import { Box, Container, Typography } from "@mui/material";
import React from "react";
import { useParams } from 'react-router-dom';
import AddMenu from "../../components/AddMenu";


export default function AddMenuPage() {
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
                    Add a Menu Item
                </Typography>
                
                <AddMenu />
            </Box>
        </Container>
    );
    
}