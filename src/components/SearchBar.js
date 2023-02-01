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
            />
            <Button variant="secondary"
                title='Find your shoes!'
                type="submit"
                className='btn-search'
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