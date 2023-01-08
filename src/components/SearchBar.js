import React from 'react';
import '../style/searchBar.css'
import { Button } from 'react-bootstrap';
import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

function SearchBar({ onSearch }) {

    const [searchTerm, setSearchTerm] = useState('')

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSearch(searchTerm);
    };

    return (
        <form onSubmit={handleSubmit} className='search-bar'>
            <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleChange}
                style={{
                    borderRadius: '4px',
                    border: '1px solid #ccc',
                    padding: '0.5em',
                    fontSize: '1em',
                    width: '50%',
                    boxSizing: 'border-box',
                    outline: 'none',
                    maxWidth: '15%',
                    transition: '0.2s',
                    marginLeft: '20px',
                    '&:focus': {
                        borderColor: '#333',
                    },
                }}
            />
            <Button variant="secondary"
                type="submit"
                style={{
                    borderRadius: '4px',
                    border: 'none',
                    padding: '0.5em 1em',
                    fontSize: '1em',
                    cursor: 'pointer',
                    transition: '0.2s',
                    textAlign: 'center',
                    marginLeft: '5px',
                    marginBottom: '2px',
                    '&:hover': {
                        background: '#444',
                    },
                }}
            >
                <FaSearch></FaSearch>
            </Button>
        </form>

    )
}

export default SearchBar