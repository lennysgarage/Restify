import React from "react";
import { Outlet } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";


export default function LandingPage() {
    return (
        <>
            <Box
                height="100vh"
                bgcolor="primary"
                display="flex"
                alignItems="center"
                justifyContent="center"
                textAlign="center"
            >
                <Box width="100%">
                    {/* need navbar component */}
                    {/* need main title component */}
                    {/* need search bar component */}
                    <Typography variant="h1">Search ANY restaurant.</Typography> {/* Probably remove this line */}
                    <Grid container spacing={1} marginTop={1}>
                        <Grid item xs={12}>
                            
                        </Grid>
                        <Grid item xs={6}>
                            
                        </Grid>
                        <Grid item xs={6}>
                            
                        </Grid>
                    </Grid>
                </Box>
            </Box>

            <Outlet />
        </>
    );
}