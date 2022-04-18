import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import authHeader from "../../services/auth-header";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Card, CardActionArea, CardHeader, Container, Pagination } from '@mui/material';


const Feed = () => {

    let navigate = useNavigate();
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(1);
    const PER_PAGE = 6;
    const [data, setData] = useState(null);

    const handlePageChange = (e, p) => {
        setPage(p);
    }

    useEffect(() => {
         axios.get(`http://localhost:8000/api/blogs/feed/?page=` + page, {
             headers: authHeader()
         })
        .then(response => {
            setData(response.data.results);
            setCount(Math.ceil(response.data.count/PER_PAGE));
         })
         
    }, [page])

    return (
        <Box sx={{ width: '100%', typography: 'body1', mt: 1 }}>
            <Container component="main" maxWidth="lg">
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {data !== null && data.map((r, index) => (
                        <Grid item xs={12} sm={6} md={3} key={index} sx={{ m: 2}}>
                        <CardActionArea component={Link} to={ `/restaurant/${r.restaurant}/blog/${r.id}` }>
                            <Card sx={{ maxWidth: 345 }}>
                                <CardHeader
                                    title={r.header}
                                    subheader={`
                                        ${r.subtext}
                                        `}
                                />
                            </Card>
                        </CardActionArea>
                        </Grid>
                    ))}
                    </Grid>
                <Pagination
                    count={count}
                    page={page}
                    variant="outlined"
                    color="primary"
                    onChange={handlePageChange}
                />
        </Container> 
        </Box>
        )
}


export default Feed;