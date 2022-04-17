import React, {useEffect, useState} from 'react';
import { Link, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import authHeader from "../../services/auth-header";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Divider from '@mui/material/Divider';
import axios from 'axios';
import { createBox } from '@mui/system';
import { Paper } from '@mui/material';
import EditPersonal from "./editPersonal";
import EditAccount from "./editAccount";
import EditAvatar from "./editAvatar";

const API_URL = "http://localhost:8000/api/"


const DisplayProfile = () => {
    const [data, setData] = useState(null);
    const [loaded, setLoaded] = useState(false);

    const fetchProfile = () => {
        return axios.get(API_URL + 'accounts/profile/view', {
            headers: authHeader()       
        })
    }

    useEffect(() => {
        fetchProfile()
            .then((response) => {
                if (response.status === 200) {
                    setData(response.data);
                } else {
                    setData(null);
                }
                setLoaded(true);
            }).catch(err => {
                setData(null);
                setLoaded(true);
            });
    }, []);

    if (loaded === true) {
        if (data !== null) {
            return (
                <Grid 
                    container 
                    alignItems="center" 
                    justifyItems="center"
                    justifyContent="flex-start"
                    spacing={2}
                > 
                <Typography variant="h1" sx={{fontWeight: 'bold', fontSize: '3rem'}}>Profile </Typography>
                {/* Avatar component */}
                <Grid item xs={12} sx={{justifyContent: 'center'}}>
                    <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        fullWidth
                    >
                        <EditAvatar data={data} setData={setData} />
                    </Box>
                </Grid>
                    {/* Account subheading */}
                    <Paper elevation={4}>
                        <Typography variant="h2" sx={{ fontWeight: 'bold', fontSize: '1.5rem', textAlign: 'start', pl: 2, mt:2 }}>Account </Typography>
                        <EditAccount data={data} />
                    </Paper>
                    {/* Personal details subheading */}
                    <Paper elevation={4} sx={{mt: 2, mb: 2}}>
                        <Typography variant="h2" sx={{ fontWeight: 'bold', fontSize: '1.5rem', textAlign: 'start', pl: 2, mt:2}}>Personal details </Typography>
                        <EditPersonal data={data} setData={setData} />
                    </Paper>
                </Grid> 
            )
        } else {
            return (
                <Typography variant="h2">You are not logged in, <Link to="/login" >click here to login!</Link></Typography>
            );
        }
    } else {
        return (
            <Typography variant="h2">Loading profile information...</Typography>
        );
    }
}

export default DisplayProfile;