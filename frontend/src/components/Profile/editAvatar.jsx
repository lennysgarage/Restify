import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import authHeader from "../../services/auth-header";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Divider from '@mui/material/Divider';
import { createBox } from '@mui/system';
import { Paper } from '@mui/material';
import { Alert } from '@mui/material';
import { InputAdornment, IconButton } from '@mui/material';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import axios from 'axios';

const API_URL = "http://localhost:8000/api/";

export default function EditAvatar(props) {


    const fetchProfile = () => {
        return axios.get(API_URL + 'accounts/profile/view', {
            headers: authHeader()       
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const input = document.querySelector('input[name="avatar"]');
        const data = new FormData();
        data.append('profile_photo', input.files[0])
        fetch(API_URL + "accounts/profile/edit/", {
            method: 'PATCH',
            headers: authHeader(),
            body: data
        }).then(res => {
            fetchProfile()
            .then((response) => {
                if (response.status === 200) {
                    props.setData(response.data);
                }
            })
        });
    }

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mb: 1 }}>
            <Grid container spacing={2} alignItems="center" justifyItems="center" sx={{ pt: 0 }}>
                <Grid item xs={12}>
                
                    <input
                        accept="image/*"
                        name="avatar"
                        id="contained-button-file"
                        hidden
                        type="file"
                        onChange={handleSubmit}
                    />
                <label htmlFor="contained-button-file">
                    <IconButton component='span'>
                        <Avatar alt="Your profile picture" src={props.data.profile_photo} sx={{ width: 128, height: 128 }}>
                                {props.data.first_name}
                        </Avatar>
                    </IconButton>
                </label>
                </Grid>
            </Grid>
        </Box>
    );

}