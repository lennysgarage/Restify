import { Button, Container, Divider, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import authHeader from "../../services/auth-header";
import LikeBlog from "../LikeBlog";

const Blog = ({ blog_id, restaurant_id }) => {
    const [status, setStatus] = useState(0);
    const [data, setData] = useState(null);
    const [isTrue, setIsTrue] = useState(false);
    const [like, setLike] = useState("");

    const handleClick = () => {
        axios.get(`http://localhost:8000/api/restaurants/${data.id}/`, {
            headers: authHeader()
        })
        .then(response => response)
    }

    useEffect(() => {
        axios.get(`http://localhost:8000/api/blogs/blog/${blog_id}/`)
        .then(response => {setData(response.data); 
                            setIsTrue(true)})
        .catch(err => setStatus(err.response.status))
        axios.get("http://localhost:8000/api/accounts/profile/view/", {
            headers: authHeader()
        })
            .then(response => setLike(<LikeBlog blogId={blog_id} userId={response.data.id} />))
    }, [blog_id])
    
    if (status === 404) {
        return (
        <Grid container alignItems="center" justifyItems="center">
            <h1>This restaurant doesn't exist</h1>
        </Grid>
    )}
    else if (isTrue){
        return (

            <Container maxWidth="xl" >
                
                <Grid container spacing={2}>
                    <Grid item xs={11} direction="column">
                    <Box sx={{ flexGrow: 1, display: 'table', marginTop: 8 }}>
                        <Typography variant="h1" display="table" >{ data.header }</Typography>
                        <br />
                        <Typography variant="h3" display="table" style={{color: "grey"}}>{ data.subtext }</Typography>
                        <br />
                        <Divider color='black' />
                        <br />
                        <Typography variant="h5" display="table" >{ data.body }</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={1} direction="column">
                    <Box sx={{ flexGrow: 0, display: 'table', marginTop: 8 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3, mb: 2 }}
                        style={{backgroundColor: '#f75000'}}
                        component={Link}
                        to={`/restaurant/${restaurant_id}`}
                    > Return to Restaurant
                    </Button>
                    { like }
                    </Box>
                    </Grid>
                </Grid>
            </Container>
        )
    }

}

export default Blog;