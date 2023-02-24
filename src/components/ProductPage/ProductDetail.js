import React, { useState } from 'react';
import '../../style/productDetail.css';

const Popup = ({ product }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedSize, setSelectedSize] = useState('M');
    const [cart, setCart] = useState([]);

    const togglePopup = () => {
        setIsOpen(!isOpen);
    };

    const handleSizeChange = (event) => {
        setSelectedSize(event.target.value);
    };


    return (
        <div>
            <button onClick={togglePopup}>Show Product Details</button>
            {isOpen && (
                <>
                    <div className="popup-overlay"></div>
                    <div className="popup show">
                        <div className="popup-inner">
                            <h2>name</h2>
                            <p>description</p>
                            <p>Price: .price</p>
                            <label htmlFor="size">Size:</label>
                            <select id="size" value={selectedSize} onChange={handleSizeChange}>
                                <option value="S">S</option>
                                <option value="M">M</option>
                                <option value="L">L</option>
                                <option value="XL">XL</option>
                            </select>
                        </div>
                        <button>Add to Cart</button>
                        <button onClick={togglePopup}>Close</button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Popup;
