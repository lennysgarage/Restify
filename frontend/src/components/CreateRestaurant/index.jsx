import React, {useEffect, useState} from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import authHeader from "../../services/auth-header";
import axios from "axios";

const CreateRestaurant = () => {
    let navigate = useNavigate();
    useEffect(() => {
    if (authHeader() === {}) {
        return <Navigate to='/login'/>
    }
    else {
        axios.get("http://localhost:8000/api/restaurants/myrestaurant/",
        { headers: authHeader() })
        .then(response => {
            if (response.status === 200) {
                navigate(`/restaurant/${response.data.id}`)
            }
        })}
    }, [navigate]) 
}

export default CreateRestaurant;