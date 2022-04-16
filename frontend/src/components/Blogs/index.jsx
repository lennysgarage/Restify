import axios from 'axios';
import React, {useEffect, useState} from 'react';
import { Link, Navigate, useNavigate } from "react-router-dom";
import AuthService from "../../services/auth.service";
import authHeader from "../../services/auth-header";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const Blogs = ({ id }) => {

    const [status, setStatus] = useState(0);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/blogs/${id}`)
        .then(response => console.log(response.data.results))
        .catch(err => setStatus(err.response.status))
        
    }, [id])

    if (status === 404) {
        return (
        <Grid container alignItems="center" justifyItems="center">
            <h1>This restaurant doesn't exist</h1>
        </Grid>
    )}
    else {
        return (
            <Grid container alignItems="center" justifyItems="center">
                <h1>Inspecting will view the list of blogs.</h1>
            </Grid>
        );
    }
}


export default Blogs;