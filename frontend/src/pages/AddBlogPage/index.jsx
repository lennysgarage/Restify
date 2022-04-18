import { Box, Container, Typography } from "@mui/material";
import React from "react";
import { useParams } from 'react-router-dom';
import AddBlog from "../../components/AddBlog";


export default function AddBlogPage() {
    const { restaurant_id } = useParams();
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
                    Add a Blog Post
                </Typography>
                
                <AddBlog id={restaurant_id} />
            </Box>
        </Container>
    );
}