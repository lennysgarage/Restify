import React from "react";
import authHeader from "../../services/auth-header";
import authService from "../../services/auth.service";
import axios from "axios";
import CreateRestaurant from "../../components/CreateRestaurant"

export default function CreateRestaurantPage() {
    return <CreateRestaurant />
    {/*axios.get("http://localhost:8000/api/restaurants/")
.then(response => console.log(response.data.results))*/}

        
}