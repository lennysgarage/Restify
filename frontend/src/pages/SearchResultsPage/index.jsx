import React, {useState, useEffect} from 'react';
import SearchBar from "../../components/Search/searchbarpage.jsx";
import SearchResultCard from "../../components/Search/searchresult.jsx";
import searchRequest from '../../components/Search/searchrequest';
import Pagination from '@mui/material/Pagination';
import Container from "@mui/material/Container";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";


export default function SearchResultsPage() {

    const [query, setQuery] = useState(window.location.href.substring(29));
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(1);
    const PER_PAGE = 2;
    const [data, setData] = useState(null);

    

    useEffect(() => {
        const search = () => {
            searchRequest(query + "&page=" + page)
              .then(response => {
                    console.log(response.data);
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
        // console.log(Object.entries(data)); 
        <Container component="main" maxWidth="lg">
            <SearchBar setQuery={setQuery}/>
            {/* // map through the data */}
            <List spacing={2}>
                {data !== null && data.map(r => {
                    return (
                        <ListItem primaryText={r.name} key={r.id}> 
                            <SearchResultCard info={r} />
                        </ListItem>
                    );
                })}
            </List>

            <Pagination
                count={count}
                page={page}
                variant="outlined"
                color="primary"
                onChange={handleChange}
            />
        </Container>
    );
}