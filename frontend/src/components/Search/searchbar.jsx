import React, {useState} from 'react';
import Paper from '@mui/material/Paper';
import { useNavigate } from "react-router-dom";
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';


export default function SearchBar() {

  const [query, setQuery] = useState("");
  let navigate = useNavigate();


    const search = (event) => {
        event.preventDefault();
        navigate("/search/" + query);
    }

    const handleInput = (event) => {
      setQuery(event.target.value);
    }

  return (
    <Paper
      component="form"
      onSubmit={search}
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}
    >
      <IconButton sx={{ p: '10px' }} aria-label="menu">
        <MenuIcon />
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search restify"
        inputProps={{ 'aria-label': 'search restify' }}
        onChange={handleInput}
      />
      <IconButton onClick={search} sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}