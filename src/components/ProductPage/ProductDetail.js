import React, { useState } from 'react';
import '../../style/productDetail.css';
import { Button, Offcanvas } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { FaEye, FaRegEye } from 'react-icons/fa';

const ProductDetail = ({ product, cartItems, onSetSize, onAdd, limitAdding }) => {

    const [show, setShow] = useState(false);
    const [prodSize, setProdSize] = useState(product.detail[0].size)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // if (product.size === undefined) {
    //     product.size = product.detail[0].size
    // }

    //get the quantity of product'size
    // const getItemSizeQuantity = () => {
    //     return product.detail.find(x => x.size === prodSize).amount
    // }

    return (
        <>
            <Button variant="light" onClick={() => {
                handleShow()
            }}>
                <FaRegEye></FaRegEye>
            </Button>

            <Offcanvas show={show} onHide={handleClose} className="offcanvas-popup" placement='top' style={{ height: "500px", borderRadius: '10px' }}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Shoe #{product.shoeID}</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <div ></div>
                    <div className="popup">
                        <div className="popup-inner">
                            <img className="popup-image" src={product.imagePath} alt={product.name} />
                            <h3>{product.name}</h3>
                            <p><strong>Color:</strong> {product.color}</p>

                            <label htmlFor="size"><strong>Size:</strong></label>
                            <Form.Select aria-label="Default select example"
                                style={{ borderRadius: '10px', width: '12%', marginLeft: '200px', position: 'relative' }}
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
                            {show &&
                                <p><strong>Items left:</strong> {product.detail.find(x => x.size === prodSize).amount}</p>
                            }
                        </div>
                        <button onClick={() => {
                            onAdd(product)
                            onSetSize(product, prodSize)
                            console.log(prodSize)
                            limitAdding()
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

export default ProductDetail;
