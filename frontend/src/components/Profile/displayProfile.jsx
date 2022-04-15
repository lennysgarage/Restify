import React, {useEffect, useState} from 'react';
import { Link, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import authHeader from "../../services/auth-header";
import axios from 'axios';



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
            console.log(data)
            return (
                <Typography variant="h2">Yes</Typography>
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