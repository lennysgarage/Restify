import { Container, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function BlogPage() {
    const { blog_id } = useParams();
    const [status, setStatus] = useState(0);
    const [data, setData] = useState(null);
    const [restaurantData, setRestaurantData] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/blogs/blog/${blog_id}/`)
        .then(response => setData(response.data))
        .catch(err => setStatus(err.response.status))
    }, [blog_id])

    if (status === 404) {
        return (
        <Grid container alignItems="center" justifyItems="center">
            <h1>This restaurant doesn't exist</h1>
        </Grid>
    )}
    else {
        return (
        <Container maxWidth="xl" >
            <Box sx={{ flexGrow: 1, display: 'flex', marginTop: 8 }}>
            <Typography variant="h1" display="inline-block" >{ data.header }</Typography>
            <br />
            <Typography variant="h5" display="inline-block" >{ data.subtext }</Typography>
            </Box>
        </Container>
        )
    }

}