import React, { useState } from 'react';
import '../../style/productDetail.css';
import { Button, Offcanvas } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

const Popup = ({ product, cartItems, onSetSize }) => {


    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    if (product.size === undefined) {
        product.size = product.detail[0].size
    }

    //get the quantity of product'size
    const getItemSizeQuantity = (item) => {
        return product.detail.find(x => x.size === product.size).amount
    }




    return (
        // <div>
        //     <button onClick={togglePopup}>Show Product Details</button>
        //     {isOpen && (
        //         <>
        //             <div className="popup-overlay"></div>
        //             <div className="popup show">
        //                 <div className="popup-inner">
        //                     <img className="popup-image" src='https://static.nike.com/a/images/q_auto:eco/t_product_v1/f_auto/dpr_3.0/w_300,c_limit/c6d9d042-f0b9-46a3-bd1f-04e16541a1d9/air-force-1-07-next-nature-shoes-cg65FM.png' />
        //                     <h2>name</h2>
        //                     <p>description</p>
        //                     <p>Price: .price</p>
        //                     <label htmlFor="size">Size:</label>
        //                     <select id="size" value={selectedSize} onChange={handleSizeChange}>
        //                         <option value="S">S</option>
        //                         <option value="M">M</option>
        //                         <option value="L">L</option>
        //                         <option value="XL">XL</option>
        //                     </select>
        //                 </div>
        //                 <button>Add to Cart</button>
        //                 <button onClick={togglePopup}>Close</button>
        //             </div>
        //         </>
        //     )}
        // </div>
        <>
            <Button variant="primary" onClick={() => {
                handleShow()
            }}>
                Open Popup
            </Button>

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
                                value={product.size}
                                onChange={(e) =>
                                    onSetSize(product, e.currentTarget.value)
                                }
                            >
                                {
                                    product.detail.map(detail =>
                                        <option value={detail.size}>{detail.size} </option>
                                    )
                                }
                            </Form.Select>
                            <p><strong>Items left:</strong>{getItemSizeQuantity(product)}</p>
                        </div>
                        <button>Add to Cart</button>
                        <button onClick={handleClose}>Close</button>
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
};

export default Popup;
