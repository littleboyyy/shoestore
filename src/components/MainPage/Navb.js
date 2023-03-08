
import React from 'react';
import { Link } from 'react-router-dom';



function Navb() {
    return (
        <>
            <div class="w3-top">
                <div class="w3-bar w3-white w3-padding w3-card">
                    <a href="#home" class="w3-bar-item w3-button">Shoes Store</a>
                    <div class="w3-right w3-hide-small">
                        <Link to={'/products'} className='w3-bar-item w3-button'>Products</Link>
                        <Link to={'/size-page'} className='w3-bar-item w3-button'>Size Chart</Link>
                        {/* <a href="/products" class="w3-bar-item w3-button">Products</a>
                        <a href="/size-page" target="_blank" class="w3-bar-item w3-button"></a> */}
                        <a href="#about" class="w3-bar-item w3-button">About Us</a>
                        <a href="#desc" class="w3-bar-item w3-button">Description</a>
                        <a href="#contact" class="w3-bar-item w3-button">Contact</a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navb;