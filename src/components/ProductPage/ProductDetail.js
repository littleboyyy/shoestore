import React, { useState } from 'react';
import '../../style/productDetail.css';
import { Button, Offcanvas } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

const Popup = ({ product, cartItems, onSetSize, onAdd, show }) => {


    const [show, setShow] = useState(show);
    const [prodSize, setProdSize] = useState(product.detail[0].size)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // if (product.size === undefined) {
    //     product.size = product.detail[0].size
    // }

    //get the quantity of product'size
    const getItemSizeQuantity = () => {
        return product.detail.find(x => x.size === prodSize).amount
    }

    return (
        <>
            <Offcanvas show={show} onHide={handleClose} className="offcanvas-popup" placement='top' style={{ height: "500px", borderRadius: '10px' }}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Popup Title</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <div ></div>
                    <div className="popup">
                        <div className="popup-inner">
                            <img className="popup-image" src={product.imagePath} alt={product.name} />
                            <h2>{product.name}</h2>
                            <p>description</p>
                            <p>Price:{product.price}</p>

                            <label htmlFor="size">Size:</label>
                            <Form.Select aria-label="Default select example"
                                style={{ borderRadius: '10px', width: '40%' }}
                                value={prodSize}
                                onChange={(e) =>
                                    setProdSize(e.currentTarget.value)
                                }
                            >
                                {
                                    product.detail.map(detail =>
                                        <option value={detail.size}>{detail.size} </option>
                                    )
                                }
                            </Form.Select>
                            <p><strong>Items left:</strong>{getItemSizeQuantity()}</p>
                        </div>
                        <button onClick={() => {
                            onAdd(product)
                        }}>
                            Add to Cart
                        </button>
                        <button onClick={handleClose}>Close</button>
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
};

export default Popup;
