import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Link, Navigate, useNavigate } from "react-router-dom";
import AuthService from "../../services/auth.service";
import authHeader from "../../services/auth-header";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme } from '@mui/material/styles';
import { orange } from '@mui/material/colors';
import { ThemeProvider } from '@emotion/react';
import { Avatar, Card, CardActionArea, CardContent, CardHeader, CardMedia, Container, Pagination } from '@mui/material';
import ChangeLogo from '../ChangeLogo';
import AddPhoto from '../AddPhoto';
import LikeRestaurant from '../LikeRestaurant';
import Follow from '../Follow';

const Restaurant = ({ id }) => {

    let navigate = useNavigate();
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(1);
    const [page2, setPage2] = useState(1);
    const [count2, setCount2] = useState(1);
    const [page3, setPage3] = useState(1);
    const [count3, setCount3] = useState(1);
    const PER_PAGE = 4;
    const [value, setValue] = useState('1');
    const [edit, setEdit] = useState("");
    const [addBlog, setAddBlog] = useState("");
    const [addComment, setAddComment] = useState("");
    const [status, setStatus] = useState(0);
    const [restaurantData, setRestaurantData] = useState(0);
    const [photoData, setPhotoData] = useState(null);
    const [logo, setLogo] = useState("");
    const [addPhoto, setAddPhoto] = useState("");
    const [addMenu, setAddMenu] = useState("");
    const [menuData, setMenuData] = useState(null);
    const [blogs, setBlogs] = useState(null);
    const [like, setLike] = useState("");
    const [follow, setFollow] = useState("");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    }

    const handlePageChange = (e, p) => {
        setPage(p);
    }

    const handlePageChange2 = (e, p) => {
        setPage2(p);
    }

    const handlePageChange3 = (e, p) => {
        setPage3(p);
    }

    const customTheme = createTheme({
        palette: {
            primary: orange,
            secondary: orange
        }
    })

    function handleClick(img) {
        axios.delete(`http://localhost:8000/api/restaurants/${id}/removephoto/${img}`, {
            headers: authHeader()
        })
            .then(response => navigate('/restaurant'))
    }

    function handleClick2(blog) {
        axios.delete(`http://localhost:8000/api/blogs/removeblog/${blog}`, {
            headers: authHeader()
        })
            .then(response => navigate('/restaurant'))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        AuthService.login(data.get('email'), data.get('password'))
            .then((res) => {
                navigate('/')
            });
    }

    useEffect(() => {
        axios.get("http://localhost:8000/api/restaurants/myrestaurant/", {
            headers: authHeader()
        })
            .then(response => {
                if (response.data.id == id) {
                    setEdit(<Button
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3, mb: 3, mr: 3 }}
                        style={{ backgroundColor: '#f75000' }}
                        component={Link}
                        to={`/restaurant/${id}/edit`}
                    >
                        Edit Restaurant
                    </Button>)
                    setAddBlog(<Button
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3, mb: 3 }}
                        style={{ backgroundColor: '#f78c25' }}
                        component={Link}
                        to={`/restaurant/${id}/addblog`}
                    >
                        Add a Blog
                    </Button>)
                    setAddComment(<Button
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3, mb: 3 }}
                        style={{ backgroundColor: '#f78c25' }}
                        component={Link}
                        to={`/restaurant/${id}/addcomment`}
                    >
                        Add a Comment
                    </Button>)
                    setLogo(<ChangeLogo />)
                    setAddPhoto(<AddPhoto id={id} />)
                    setAddMenu(
                        <Button
                            variant="contained"
                            color="primary"
                            sx={{ mt: 3, mb: 3 }}
                            style={{ backgroundColor: '#f78c25' }}
                            component={Link}
                            to={`/restaurant/${id}/addmenu`}
                        >
                            Add a Menu Item
                        </Button>)
                    setStatus(response.status)
                }
            })
            .catch(err => err)
        axios.get(`http://localhost:8000/api/restaurants/${id}`)
            .then(response => setRestaurantData(response.data))
            .catch(err => setStatus(err.response.status))
        axios.get("http://localhost:8000/api/accounts/profile/view/", {
            headers: authHeader()
        })
            .then(response => {
                setLike(<LikeRestaurant restaurantId={id} userId={response.data.id} />);
                setFollow(<Follow restaurantId={id} userId={response.data.id} />)})
            .catch(err => setStatus(err.response.status))
        axios.get(`http://localhost:8000/api/restaurants/${id}/photos/?page=` + page)
            .then(response => {
                setPhotoData(response.data.results);
                setCount(Math.ceil(response.data.count / PER_PAGE));
            });
        axios.get(`http://localhost:8000/api/restaurants/${id}/menu/?page=` + page2)
            .then(response => {
                setMenuData(response.data.results);
                setCount2(Math.ceil(response.data.count / PER_PAGE));
            })
        axios.get(`http://localhost:8000/api/blogs/${id}/?page=` + page3)
            .then(response => {
                setBlogs(response.data.results);
                setCount3(Math.ceil(response.data.count / PER_PAGE));
            })
    }, [id, page, page2, page3])

    if (status === 404) {
        return (
            <Grid container alignItems="center" justifyItems="center">
                <h1>This restaurant doesn't exist</h1>
            </Grid>
        )
    }
    else {
        return (
            <Box sx={{ width: '100%', typography: 'body1', mt: 1 }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'orange', color: 'orange' }} display="flex" alignItems="center" justifyContent="center" >
                        <ThemeProvider theme={customTheme}>
                            <TabList onChange={handleChange} TabIndicatorProps={{ style: { background: 'orange' } }} indicatorColor={'primary'} >
                                <Tab label="Restaurant" value="1" />
                                <Tab label="Menu" value="2" />
                                <Tab label="Blog" value="3" />
                                <Tab label="Comments" value="4" />
                            </TabList>
                        </ThemeProvider>
                    </Box>
                    <TabPanel value="1" >
                    <Typography align="right" sx={{ mb: 3 }}> {follow} </Typography>
                        <Typography align="right" sx={{ mb: 3 }}> {like} </Typography>
                        <div style={{ backgroundImage: `url(${restaurantData.logo})` }} >
                            <Typography align="right"> {edit} </Typography>
                            <Typography align="right" component="span"> {logo} </Typography>
                            <Typography variant="h1" bgcolor="rgba(0,0,0,0.7)" color="white" display="inline-block" >{restaurantData.name}</Typography>
                            <br />
                            <br />
                            <Typography variant="h4" bgcolor="rgba(0,0,0,0.7)" color="white" display="inline-block" >{restaurantData.description}</Typography>
                            <br />
                            <br />
                        </div>
                        <br />
                        <br />
                        <Typography variant="h5" align="left" fontWeight='bold'> Address: {restaurantData.address}, {restaurantData.country_code},  {restaurantData.postal_code}</Typography>
                        <br />
                        <Typography variant="h5" align="left" fontWeight='bold'> Phone: {restaurantData.phone_number}</Typography>
                        <br />
                        <Typography variant="h5" color="black" display="inline-block" component="span">Photo Gallery: {addPhoto}</Typography>
                        <Container component="main" maxWidth="lg">
                            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                                {photoData !== null && photoData.map((r, index) => (
                                    <Grid item xs={12} sm={6} md={3} key={index} sx={{ m: 2 }}>
                                        <Card sx={{ maxWidth: 345 }}>
                                            <CardMedia
                                                component="img"
                                                alt="Restaurant Logo"
                                                height="256"
                                                image={r.img}
                                            />
                                        </Card>
                                        {(status === 200 ? <Button
                                            variant="contained"
                                            color="primary"
                                            sx={{ mt: 3, mb: 3 }}
                                            style={{ backgroundColor: '#f75000' }}
                                            onClick={() => { handleClick(r.id) }}
                                        >
                                            Remove Photo
                                        </Button> : "")}
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
                    </TabPanel>
                    <TabPanel value="2" >
                        <Typography variant="h5" color="black" display="inline-block" component="span">{addMenu}</Typography>
                        <Container component="main" maxWidth="lg">
                            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                                {menuData !== null && menuData.map((r, index) => (
                                    <Grid item xs={12} sm={6} md={3} key={index} sx={{ m: 2 }}>
                                        <Card sx={{ maxWidth: 345 }}>
                                            <CardMedia
                                                component="img"
                                                alt="Restaurant Logo"
                                                height="256"
                                                image={r.photo}
                                            />
                                            <CardHeader
                                                title={r.name}
                                                subheader={`
                                                Price: ${r.price}
                                                `}
                                            />
                                            <CardContent>
                                                <Typography variant="body2" color="text.secondary">
                                                    {r.description}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                        {(status === 200 ? <Button
                                            variant="contained"
                                            color="primary"
                                            sx={{ mt: 3, mb: 3 }}
                                            style={{ backgroundColor: '#f75000' }}
                                            component={Link}
                                            to={`/restaurant/menu/${r.id}`}
                                        >
                                            Edit Menu Item
                                        </Button> : "")}
                                    </Grid>
                                ))}
                            </Grid>
                            <Pagination
                                count={count2}
                                page={page2}
                                variant="outlined"
                                color="primary"
                                onChange={handlePageChange2}
                            />
                        </Container>
                    </TabPanel>
                    <TabPanel value="3">
                        <Typography variant="h5" color="black" display="inline-block" component="span">{addBlog}</Typography>
                        <Container component="main" maxWidth="lg">
                            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                                {blogs !== null && blogs.map((r, index) => (
                                    <Grid item xs={12} sm={6} md={3} key={index} sx={{ m: 2 }}>
                                        <CardActionArea component={Link} to={`/restaurant/${id}/blog/${r.id}`}>
                                            <Card sx={{ maxWidth: 345 }}>
                                                <CardHeader
                                                    title={r.header}
                                                    subheader={`
                                                ${r.subtext}
                                                `}
                                                />
                                            </Card>
                                        </CardActionArea>
                                        {(status === 200 ? <Button
                                            variant="contained"
                                            color="primary"
                                            sx={{ mt: 3, mb: 2 }}
                                            style={{ backgroundColor: '#f75000' }}
                                            onClick={() => { handleClick2(r.id) }}
                                        >
                                            Remove Blog
                                        </Button> : "")}
                                    </Grid>
                                ))}
                            </Grid>
                            <Pagination
                                count={count3}
                                page={page3}
                                variant="outlined"
                                color="primary"
                                onChange={handlePageChange3}
                            />
                        </Container>
                    </TabPanel>
                    <TabPanel value="4">
                    <Typography variant="h5" color="black" display="inline-block" component="span">{addComment}</Typography>
                        <Container component="main" maxWidth="lg">
                            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                                {blogs !== null && blogs.map((r, index) => (
                                    <Grid item xs={12} sm={6} md={3} key={index} sx={{ m: 2 }}>
                                        
                                    </Grid>
                                ))}
                            </Grid>
                            <Pagination
                                count={count3}
                                page={page3}
                                variant="outlined"
                                color="primary"
                                onChange={handlePageChange3}
                            />
                        </Container>
                    </TabPanel>
                </TabContext>
            </Box>
        )
    }
}


export default Restaurant;