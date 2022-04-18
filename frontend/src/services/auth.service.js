// Source: https://www.bezkoder.com/react-jwt-auth/

import axios from "axios";
const API_URL = "http://localhost:8000/api/"

class AuthService {
    login(email, password) {
        return axios
            .post(API_URL + "accounts/login/", {
                email,
                password
            })
            .then(response => {
                if (response.data.access) {
                    localStorage.setItem("user", JSON.stringify(response.data))
                }
                return response.data;
            })
            .catch((error) => {
                return {status: 401} });
    }

    logout() {
        localStorage.removeItem("user");
    }

    register(email, password, password2){
        return axios.post(API_URL + "accounts/register/", {
            email,
            password,
            password2
        });
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem("user"));
    }
}

export default new AuthService();