import axios from 'axios';
import React, {useEffect, useState} from 'react';
import { Link, useNavigate } from "react-router-dom";
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
                    type="submit"
                    fullWidth
                    sx={{ mt: 3, mb: 2 }}
                    style={{backgroundColor: '#f78c25'}}
                >
                        <Link to="/edit" >Edit Restaurant</Link>
                </Button>)
        }})
        .catch(err => err)
    }, [id])

    return (
        <Grid container alignItems="center" justifyItems="center">
            <h1>You will see an edit button below me if you own the restaurant.</h1>
            { edit }
        </Grid>
    );
}


export default Restaurant;