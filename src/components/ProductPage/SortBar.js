import React from 'react';

import '../../style/sortbar.css'

import { Nav, NavDropdown, Dropdown } from 'react-bootstrap';
import { useState } from 'react';
import { FaFilter, FaSort, FaSortAlphaDownAlt, FaSortNumericDownAlt, FaSortUp } from 'react-icons/fa';
import { useEffect } from 'react';

export default function SortBar({ onSelect }) {

    const [sortTerm, setSortTerm] = useState('')

    const handleSelect = (event) => {
        if (event === 'default')
            window.parent.location = window.parent.location.href;
        else
            setSortTerm(event)
    }

    useEffect(() => {
        onSelect(sortTerm)
    }, [sortTerm])


    return (
        <Nav className='sort-nav'>
            <NavDropdown
                defaultValue={'default'}
                onSelect={handleSelect}
                title={
                    <div className="nav-drop">
                        <FaSort></FaSort>
                    </div>
                }
                id="basic-nav-dropdown">
                <Dropdown.Item eventKey="default">Default</Dropdown.Item >
                <Dropdown.Header>Price or Name</Dropdown.Header>
                <Dropdown.Item eventKey="increase">Sort by price increasing</Dropdown.Item>
                <Dropdown.Item eventKey="decrease">Sort by price decreasing</Dropdown.Item>
                <Dropdown.Item eventKey="name">Sort by Name</Dropdown.Item>
                <Dropdown.Divider />
            </NavDropdown>
        </Nav>
    )
}