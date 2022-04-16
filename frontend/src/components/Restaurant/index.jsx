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

const Restaurant = ({ id }) => {

    let navigate = useNavigate();
    const [edit, setEdit] = useState("");
    const [addBlog, setAddBlog] = useState("");
    const [status, setStatus] = useState(0);


    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        AuthService.login(data.get('email'), data.get('password'))
            .then((res) => {
                navigate('/')
            });
    }

    useEffect(() => {
        axios.get("http://localhost:8000/api/restaurants/myrestaurant/", {
            headers: authHeader()
            })
        .then(response => {
            if (response.data.id == id) {
                setEdit(<Button
                    variant="contained"
                    color="primary"
                    sx={{ mt: 3, mb: 2 }}
                    style={{backgroundColor: '#f78c25'}}
                    component={Link} 
                    to={`/restaurant/${id}/edit`}
                >
                        Edit Restaurant
                </Button>)
                setAddBlog(<Button
                    variant="contained"
                    color="primary"
                    sx={{ mt: 3, mb: 2 }}
                    style={{backgroundColor: '#f78c25'}}
                    component={Link} 
                    to={`/restaurant/${id}/addblog`}
                >
                        Add a Blog
                </Button>)
        }})
        .catch(err => err)
        axios.get(`http://localhost:8000/api/restaurants/${id}`)
        .then(response => console.log(response.data))
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
                <h1>You will see an edit and addBlog button next to me if you own the restaurant.</h1>
                { edit }
                { addBlog }
            </Grid>
        );
    }
}


export default Restaurant;