import React, { useState } from 'react';
import '../../style/filter.css'

export default function Filter({ options, onFilterChange }) {
    const [selectedFilters, setSelectedFilters] = useState([]);

    function handleCheckboxChange(e) {
        const filter = e.target.value;
        const isSelected = e.target.checked;

        let newFilters;
        if (isSelected) {
            newFilters = [...selectedFilters, filter];
        } else {
            newFilters = selectedFilters.filter((f) => f !== filter);
        }

        setSelectedFilters(newFilters);
        onFilterChange(newFilters);
    }


    return (
        <div className="filter-component">
            <h2 className="filter-component-title">Brands:</h2>
            <div className="filter-component-options">
                {options.map((option) => (
                    <label key={option}>
                        <input
                            type="checkbox"
                            style={{ transform: 'scale(1.5)', margin: '0 10px 20px 10px', accentColor: '#000080' }}
                            value={option}
                            checked={selectedFilters.includes(option)}
                            onChange={handleCheckboxChange}
                        />
                        {option}
                    </label>
                ))}
            </div>
        </div>
    );
}
