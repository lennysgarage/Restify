import axios from 'axios';

const API_URL = "http://localhost:8000/api/restaurants/"

const searchRequest = (query) => {
    
    return axios.get(API_URL + "search/?q=" + query);
    
}

export default searchRequest;