
import React from 'react';



function Navb() {
    return (
        <>
            <div class="w3-top">
                <div class="w3-bar w3-white w3-padding w3-card">
                    <a href="#home" class="w3-bar-item w3-button">Shoes Store</a>
                    <div class="w3-right w3-hide-small">
                        <a href="/products" class="w3-bar-item w3-button">Products</a>
                        <a href="#about" class="w3-bar-item w3-button">About</a>
                        <a href="#desc" class="w3-bar-item w3-button">Description</a>
                        <a href="#contact" class="w3-bar-item w3-button">Contact</a>
                        <a href="/admin" class="w3-bar-item w3-button" target="_blank">Admin</a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navb;