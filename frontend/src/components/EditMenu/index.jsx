import React, {useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import authHeader from "../../services/auth-header";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";


const defaultValues = {
    name: "",
    price: "",
    description: ""
}

const EditMenu = ({ id }) => {
    const [errors, setErrors] = useState(defaultValues);
    const [owner, setOwner] = useState(false);
    const [data, setData] = useState(null);

    let navigate = useNavigate();

    const validate = (formValues) => {
        let tempValues = {...errors};
        for (var pair of formValues.entries()){
            if (pair[0] === 'name') {
                tempValues.name = pair[1] ? "" : "Enter item's name"; 
            }
            if (pair[0] === 'price') {
                tempValues.price = parseFloat(pair[1]) ? "" : "Enter item's price";
            }
            if (pair[0] === 'description') {
                tempValues.description = pair[1] ? "" : "Enter item's description";
            }
        }
        setErrors({
            ...tempValues,
        });

        // If all elements are "", then no errors were found
        return Object.values(tempValues).every((x) => x === "");
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        if (validate(data)) {
            fetch(`http://localhost:8000/api/restaurants/editmenu/${id}/`, {
                method: 'PATCH',
                body: data,
                headers: authHeader()
            })
            .then((res) => {
                navigate("/restaurant")
            })
        }
    }

    const handlePhoto = (e) => {
        e.preventDefault();
        const input = document.querySelector('input[name="photo"]');
        const data = new FormData();
        data.append('photo', input.files[0]);
        fetch(`http://localhost:8000/api/restaurants/editmenu/${id}/`, {
            method: 'PATCH',
            body: data,
            headers: authHeader()
        })
        .then((res) => res)
    }
    
    useEffect(() => {
        axios.get(`http://localhost:8000/api/restaurants/menu/${id}/`, {
            headers: authHeader()
            })
        .then(response => {
            setData(response.data)
                setOwner(true)
        })
        .catch(err => err)   
    }, [id])


    const handleChange = (e) => {
        const { name, value } = e.target;
        var data = new FormData();
        data.set(name, value)
        validate(data);
    }

    if (owner) {
        return (
            <Box sx={{ mt: 1}}>
            <Button
            variant="contained"
            component="label"
            color="primary"
            style={{backgroundColor: '#f78c25'}}
            sx={{ mt: 3, mb: 2 }}
        >
            Change Photo of Menu Item 
            <input
                hidden
                name="photo"
                accept="image/*"
                type="file"
                onChange={ handlePhoto }
            />
            </Button>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1}}>
            <Grid container alignItems="center" justifyItems="center">
                <Grid item xs={12}>
                    <TextField
                        margin="normal"
                        id="name-input"
                        name="name"
                        type="text"
                        label="Name"
                        placeholder={data.name}
                        defaultValue={data.name}
                        fullWidth
                        onChange={handleChange}
                        error={errors.name !== ''}
                        helperText={errors.name}
                        autoComplete="name"
                        autoFocus
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        margin="normal"
                        id="price-input"
                        name="price"
                        label="Price"
                        type="text"
                        placeholder={data.price}
                        defaultValue={data.price}
                        fullWidth
                        onChange={handleChange}
                        error={errors.price !== ''}
                        helperText={errors.price}
                        autoComplete="price"
                        autoFocus
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        margin="normal"
                        id="description-input"
                        name="description"
                        type="text"
                        label="Description"
                        multiline
                        fullWidth
                        placeholder={data.description}
                        defaultValue={data.description}
                        onChange={handleChange}
                        error={errors.description !== ''}
                        helperText={errors.description}
                        autoComplete="description"
                    />
                </Grid>
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    fullWidth
                    sx={{ mt: 3, mb: 2 }}
                    style={{backgroundColor: '#f75000'}}
                >
                        Update Menu
                </Button>
            </Grid>
        </Box>
        </Box>
        );
    }
    else {
        return (
            <Grid container alignItems="center" justifyItems="center">
                <h1>You cannot edit a menu item you do not own.</h1>
            </Grid>
        )
    }

}


export default EditMenu;