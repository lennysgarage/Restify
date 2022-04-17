import React from "react";
import { Outlet } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Logout from "../../components/Logout";
import SearchBar from "../../components/Search/searchbar.jsx";

export default function LandingPage() {
    return (
        <>
            <Box
                height="90vh"
                bgcolor="primary"
                display="flex"
                alignItems="center"
                justifyContent="center"
                textAlign="center"
            >
                <Box width="60%">
                    {/* need navbar component */}
                    {/* need main title component */}
                    {/* need search bar component */}
                    <Typography variant="h1">Search ANY restaurant.</Typography> {/* Probably remove this line */}
                    <SearchBar/>
                    <Grid container spacing={1} marginTop={1}>
                        <Grid item xs={12}>
                            <Logout/>
                        </Grid>
                        <Grid item xs={6}>
                        </Grid>
                        <Grid item xs={6}>
                            
                        </Grid>
                    </Grid>
                </Box>
            </Box>

            {/* <Outlet /> */}
        </>
    );
}