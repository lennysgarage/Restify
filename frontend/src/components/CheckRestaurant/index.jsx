import axios from 'axios';
import React, {useEffect, useState} from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import authHeader from "../../services/auth-header";
import CreateRestaurant from '../CreateRestaurant';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";


const CheckRestaurant = () => {
    let navigate = useNavigate();
    
    const [status, setStatus] = useState(0);

    useEffect(() => {
        axios.get("http://localhost:8000/api/restaurants/myrestaurant/", {
            headers: authHeader()
            })
        .then(response => {return navigate(`/restaurant/${response.data.id}`)})
        .catch(err => setStatus(err.response.status))
    }, [navigate])

    if (status === 404) {
        return (
            <Container component="main" maxWidth="sm">
                <Box 
                    sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
                >
                <Typography component="h1" variant="h5">
                Create Your Restaurant
                </Typography>
                <CreateRestaurant /> 
                </Box>
            </Container>
        );
    }
    else if (status === 401) {
        return <Navigate to='/login'/>
    }
}

export default CheckRestaurant;