import React, {useEffect, useState} from 'react';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import authHeader from "../../services/auth-header";
import { Alert } from '@mui/material';


const API_URL = "http://localhost:8000/api/";


export default function EditPersonal(props) {
    const [success, setSuccess] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const mergedObject = {
            ...data,
            ...props.data
        }
        fetch(API_URL + "accounts/profile/edit/", {
            method: 'PATCH',
            headers: authHeader(),
            body: data
        });
        props.setData(mergedObject);
        setSuccess(true);
    }

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mb: 1 }}>
        {success && <Alert onClose={() => {setSuccess(false)}}>Personal information updated!</Alert>}
            <Grid container spacing={2} alignItems="center" justifyItems="center" sx={{p:2}}>
                <Grid item xs={6}>
                    <TextField
                            margin="normal"
                            id="first_name-input"
                            name="first_name"
                            type="text"
                            label="First Name"
                            placeholder={props.data.first_name}
                            defaultValue={props.data.first_name}
                            fullWidth
                            autoComplete="name"
                            autoFocus
                        />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                            margin="normal"
                            id="last_name-input"
                            name="last_name"
                            type="text"
                            label="Last Name"
                            placeholder={props.data.last_name}
                            defaultValue={props.data.last_name}
                            fullWidth
                            autoComplete="name"
                            autoFocus
                        />
                </Grid>
                <Grid item xs={4}>
                    <TextField
                            margin="normal"
                            id="cc-input"
                            name="country_code"
                            type="text"
                            label="Country Code"
                            placeholder={props.data.country_code}
                            defaultValue={props.data.country_code}
                            fullWidth
                            autoFocus
                        />
                </Grid>
                <Grid item xs={8}>
                    <TextField
                            margin="normal"
                            id="phone-input"
                            name="phone_number"
                            type="tel"
                            label="Phone Number"
                            placeholder={props.data.phone_number}
                            defaultValue={props.data.phone_number}
                            fullWidth
                            autoFocus
                        />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        margin="normal"
                        id="address-input"
                        name="address"
                        type="text"
                        label="Address"
                        placeholder={props.data.address}
                        defaultValue={props.data.address}
                        fullWidth
                        autoFocus
                    />
                </Grid>
                <Grid item xs={12}>
                    <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        fullWidth
                    >
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            sx={{mb: 2, mt: 1}}
                            style={{backgroundColor: '#f75000'}}
                        >
                            Update Personal Information
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}