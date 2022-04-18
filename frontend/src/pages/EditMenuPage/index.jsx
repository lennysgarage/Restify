import { Box, Container, Typography } from "@mui/material";
import React from "react";
import { useParams } from 'react-router-dom';
import EditMenu from "../../components/EditMenu";
import EditRestaurant from "../../components/EditRestaurant";


export default function EditMenuPage() {
    const { menu_id } = useParams();
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
                    Edit Menu Item
                </Typography>
                
                <EditMenu id={menu_id} />
            </Box>
        </Container>
    );
}