import { Container, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Blog from "../../components/Blog"

export default function BlogPage() {
    const { blog_id } = useParams();
    return <Blog id={ blog_id } />

}