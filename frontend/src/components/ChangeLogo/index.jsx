import React, {useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import authHeader from "../../services/auth-header";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

const ChangeLogo = () => {

    let navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const input = document.querySelector('input[name="logo"]');
        const data = new FormData(e.currentTarget);
        data.append('logo', input.files[0]);
        fetch("http://localhost:8000/api/restaurants/edit/", {
            method: 'PATCH',
            body: data,
            headers: authHeader()
        })
        .then((res) => {
            navigate("/restaurant")
        })
    }

        return (
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1}}>
                <Button
                    variant="contained"
                    component="label"
                    color="primary"
                    sx={{ mt: 3, mb: 2 }}
                    style={{backgroundColor: '#f75000'}}
                > Select New Logo      
                 <input
                        hidden
                        name="logo"
                        type="file"
                    />
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    sx={{ mt: 3, mb: 2 }}
                    style={{backgroundColor: '#f75555'}}
                > Update Logo      
                </Button>
            </Box>
        );

}


export default ChangeLogo;