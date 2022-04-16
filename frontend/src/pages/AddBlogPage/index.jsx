import React from "react";
import { useParams } from 'react-router-dom';
import AddBlog from "../../components/AddBlog";


export default function AddBlogPage() {
    const { restaurant_id } = useParams();
    return <AddBlog id={restaurant_id} />
}