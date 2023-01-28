import React from 'react';
import size_chart from '../static/img/Size_Chart.jpg'

function SizePage() {
    return (
        <div style={{ textAlign: 'center' }}>
            <h1>Shoe Size Chart</h1>
            <img src={size_chart} alt="size chart" />
            <br /><br /><br />
            <div style={{ color: 'red', fontSize: '20px' }}>
                <strong>We use EU size for products.</strong>
                <br />
                <strong>Please change your size to EU size to get the suitable products!</strong>
            </div>
        </div>

    )
}

export default SizePage