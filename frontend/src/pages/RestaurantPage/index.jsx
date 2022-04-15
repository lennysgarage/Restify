import React from "react";
import { useParams } from 'react-router-dom';
import Restaurant from "../../components/Restaurant";


export default function RestaurantPage() {
    const { restaurant_id } = useParams();
    return <Restaurant id={restaurant_id} />
}