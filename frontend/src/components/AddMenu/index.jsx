import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
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

const AddMenu = () => {
    const [errors, setErrors] = useState(defaultValues);

    let navigate = useNavigate();


    const validate = (formValues) => {
        let tempValues = {...errors};
        for (var pair of formValues.entries()){
            if (pair[0] === 'name') {
                tempValues.name = pair[1] ? "" : "Enter item's name"; 
            }
            if (pair[0] === 'price') {
                tempValues.price = pair[1] ? "" : "Enter item's price";
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
        const input = document.querySelector('input[name="photo"]');
        const data = new FormData(e.currentTarget);
        data.append('photo', input.files[0]);
        if (validate(data)) {
            fetch('http://localhost:8000/api/restaurants/addmenu/', {
                method: 'POST',
                body: data,
                headers: authHeader()
            })
                .then((res) => {
                    navigate('/restaurant/')
                })
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        var data = new FormData();
        data.set(name, value)
        validate(data);
    }

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <Grid container alignItems="center" justifyItems="center">
                <Grid item xs={12}>
                    <TextField
                        margin="normal"
                        id="name-input"
                        name="name"
                        type="text"
                        label="Name"
                        placeholder="Enter the name of the menu item."
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
                        label="Price ($)"
                        placeholder="0.00"
                        fullWidth
                        onChange={handleChange}
                        error={errors.price !== ''}
                        helperText={errors.price}
                        autoComplete="price"
                        autoFocus
                        step={0.01}
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
                        onChange={handleChange}
                        error={errors.description !== ''}
                        helperText={errors.description}
                        placeholder="Enter the description of your menu item."
                        autoComplete="description"
                    />
                </Grid>
                <Button
                    variant="contained"
                    component="label"
                    color="primary"
                    style={{backgroundColor: '#f78c25'}}
                    sx={{ mt: 2 }}
                >
                    Upload a Photo of the menu Item
                    <input
                        name="photo"
                        accept="image/*"
                        type="file"
                        required
                    />
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    fullWidth
                    sx={{ mt: 4 }}
                    style={{backgroundColor: '#f75000'}}
                >
                        Add Menu Item
                </Button>
            </Grid>
        </Box>
    );
}


export default AddMenu;