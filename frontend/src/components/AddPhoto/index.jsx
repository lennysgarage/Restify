import React, {useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import authHeader from "../../services/auth-header";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

const AddPhoto = ({ id }) => {

    let navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const input = document.querySelector('input[name="img"]');
        const data = new FormData();
        data.append('img', input.files[0]);
        fetch(`http://localhost:8000/api/restaurants/${id}/addphoto/`, {
            method: 'POST',
            body: data,
            headers: authHeader()
        })
        .then((res) => {
            navigate("/restaurant")
        })
    }

        return (
            <Button
                variant="contained"
                component="label"
                color="primary"
                sx={{ mt: 3, mb: 3 }}
                style={{backgroundColor: '#f75000'}}
            > 
            Add a Photo      
            <input
                    hidden
                    name="img"
                    accept="image/*"
                    type="file"
                    onChange={ handleSubmit }
                />
            </Button>
        );

}


export default AddPhoto;