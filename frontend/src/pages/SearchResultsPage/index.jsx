import React, {useState, useEffect} from 'react';
import SearchBar from "../../components/Search/searchbarpage.jsx";
import searchRequest from '../../components/Search/searchrequest';

export default function SearchResultsPage() {

    const [query, setQuery] = useState("");
    const [data, setData] = useState(null);

    
    useEffect(() => {
        const search = () => {
            searchRequest(query)
              .then(response => {console.log(response.data)});
        }
        search();
    }, [query]);

    return (
        <SearchBar setQuery={setQuery}/>
        // map through the data

    );
}