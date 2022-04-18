import React, {useState, useEffect} from 'react';
import SearchBar from "../../components/Search/searchbarpage.jsx";
import SearchResultCard from "../../components/Search/searchresult.jsx";
import searchRequest from '../../components/Search/searchrequest';
import Pagination from '@mui/material/Pagination';
import Container from "@mui/material/Container";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Grid from "@mui/material/Grid";

export default function SearchResultsPage() {

    const [query, setQuery] = useState(window.location.href.substring(29));
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(1);
    const PER_PAGE = 2; // This needs to be same as pagination value in django backend
    const [data, setData] = useState(null);

    

    useEffect(() => {
        const search = () => {
            searchRequest(query + "&page=" + page)
              .then(response => {
                    setData(response.data.results);
                    setCount(Math.ceil(response.data.count/PER_PAGE));
                });
        }
        search();
    }, [query, page]);

    const handleChange = (e, p) => {
        setPage(p);
    }

    return (
        <Container component="main" maxWidth="lg" sx={{ p: 2, m: 2}}>
            <SearchBar setQuery={setQuery}/>
            {/* // map through the data */}
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {data !== null && data.map((r, index) => (
                    <Grid item xs={2} sm={4} md={4} key={index} sx={{ m: 2}}>
                        <SearchResultCard info={r} />
                    </Grid>
                ))}
            </Grid>

            <Pagination
                count={count}
                page={page}
                variant="outlined"
                color="primary"
                onChange={handleChange}
                sx={{ mt: 4}}
            />
        </Container>
    );
}