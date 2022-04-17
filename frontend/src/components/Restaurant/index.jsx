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
import MuiImageSlider from 'mui-image-slider';

const Restaurant = ({ id }) => {

    const customTheme = createTheme({
        palette: {
            primary: orange,
            secondary: orange
        }
    })

    const images = [
        'https://st.depositphotos.com/2291517/4015/i/600/depositphotos_40155451-stock-photo-any-questions-concept.jpg',
        'https://media-exp1.licdn.com/dms/image/C4D0BAQEjEMjwE0h-Hg/company-logo_200_200/0/1616511236450?e=2147483647&v=beta&t=cojR4JuiKc8svj0lHVU6zJF9rfObpdFr9iiDyqi6ctg',
    ];
    
    let navigate = useNavigate();
    const [value, setValue] = useState('1');
    const [edit, setEdit] = useState("");
    const [addBlog, setAddBlog] = useState("");
    const [status, setStatus] = useState(0);
    const [restaurantData, setRestaurantData] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

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
                    sx={{ mt: 3, mb: 2 }}
                    style={{backgroundColor: '#f78c25'}}
                    component={Link} 
                    to={`/restaurant/${id}/edit`}
                >
                        Edit Restaurant
                </Button>)
                setAddBlog(<Button
                    variant="contained"
                    color="primary"
                    sx={{ mt: 3, mb: 2 }}
                    style={{backgroundColor: '#f78c25'}}
                    component={Link} 
                    to={`/restaurant/${id}/addblog`}
                >
                        Add a Blog
                </Button>)
        }})
        .catch(err => err)
        axios.get(`http://localhost:8000/api/restaurants/${id}`)
        .then(response => setRestaurantData(response.data))
        .catch(err => setStatus(err.response.status))
        
    }, [id])

    if (status === 404) {
        return (
        <Grid container alignItems="center" justifyItems="center">
            <h1>This restaurant doesn't exist</h1>
        </Grid>
    )}
    else {
        return (
            <Box sx={{ width: '100%', typography: 'body1', mt: 1 }}>
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'orange', color: 'orange' }} display="flex" alignItems="center" justifyContent="center">
                <ThemeProvider theme={customTheme}>
                  <TabList onChange={handleChange} TabIndicatorProps={{style: {background:'orange'}}} indicatorColor={'primary'}>
                    <Tab label="Restaurant" value="1" />
                    <Tab label="Menu" value="2" />
                    <Tab label="Blog" value="3" />
                  </TabList>
                </ThemeProvider>
                </Box>
                <TabPanel value="1" >
                    <div style={{ backgroundImage: `url(${restaurantData.logo})`}}>
                        <Typography align="right"> { edit } </Typography>
                        <Typography variant="h1" bgcolor="rgba(0,0,0,0.7)" color="white" display="inline-block" >{ restaurantData.name }</Typography>
                        <br/>
                        <br/>
                        <Typography variant="h4" bgcolor="rgba(0,0,0,0.7)" color="white" display="inline-block" >{ restaurantData.description }</Typography>
                        <br/>
                        <br/>
                    </div>
 
                    <MuiImageSlider images={images}/>      
                </TabPanel>
                <TabPanel value="2" >Item Two</TabPanel>
                <TabPanel value="3">{ addBlog }</TabPanel>
              </TabContext>
            </Box>
          )
    }
}


export default Restaurant;