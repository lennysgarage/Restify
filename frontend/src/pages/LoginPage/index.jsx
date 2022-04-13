import React, { useState } from "react";
import AuthService from "../../services/auth.service";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";


export default function LoginPage() {
    const [formValues, setFormValues] = useState({email: "", password: ""});

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formValues.email);
        AuthService.login(formValues.email, formValues.password)
            .then((res) => {
                console.log(res)
            })
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                id="email-input"
                name="email"
                type="email"
                value={formValues.email}
                onChange={handleChange}
            />
            <TextField
                id="password-input"
                name="password"
                type="password"
                value={formValues.password}
                onChange={handleChange}
            />
            <Button
                variant="contained"
                color="primary"
                type="submit"
            >
                    Sign in
                </Button>


        </form>
    );
}