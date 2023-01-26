import React from 'react';
import size_chart from '../static/img/Size_Chart.jpg'

function SizePage() {
    return (
        <div style={{ textAlign: 'center' }}>
            <h1>Shoe Size Chart</h1>
            <img src={size_chart} alt="size chart" />
        </div>

    )
}

export default SizePage