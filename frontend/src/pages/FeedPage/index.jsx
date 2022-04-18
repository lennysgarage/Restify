import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Feed from "../../components/Feed";

export default function FeedPage() {

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
                

                <Feed />
            </Box>
        </Container>
    );
}