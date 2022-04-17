import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import DisplayProfile from "../../components/Profile/displayProfile";

export default function ProfilePage() {

    return (
        <Container component="main" maxWidth="md">
            <Box 
                sx={{
                marginTop: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
            >
                

                <DisplayProfile/>
            </Box>
        </Container>
    );
}