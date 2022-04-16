import React from "react";
import { useParams } from "react-router-dom";
import Blogs from "../../components/Blogs";

export default function BlogPage() {
    const { restaurant_id } = useParams();
    return <Blogs id={restaurant_id} />
}