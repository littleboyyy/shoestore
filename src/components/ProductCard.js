import React from 'react';
import '../style/card.css';
import { Row, Col, } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const ProductCard = ({ products, onAdd, prodOnSearch }) => {

    const getProdOnSearch = products.find(x => x.name == prodOnSearch)

    const notifyAdded = () => {
        toast.success('Added to Cart!', {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    }

    const notifyNotFound = () => {
        toast.error('Item Not Found!', {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    }


    return (
        <Row>
            {/* {prodOnSearch !== '' && !getProdOnSearch && notifyNotFound()} */}
            {
                prodOnSearch === '' || !getProdOnSearch ?
                    products.map(item => (
                        <Col style={{ padding: '50px' }}>
                            <div className="product-card">
                                <img className="product-image" src={item.imagePath} />
                                <h3 className="product-name overflow-wrap"
                                >{item.name}
                                </h3>
                                <p className="product-price">${item.price}</p>
                                <button className="add-to-cart" onClick={() => {
                                    onAdd(item)
                                    notifyAdded()
                                }}>
                                    Add to Cart
                                </button>
                                <ToastContainer
                                    position="top-right"
                                    autoClose={5000}
                                    hideProgressBar={false}
                                    newestOnTop={false}
                                    closeOnClick
                                    rtl={false}
                                    pauseOnFocusLoss
                                    draggable
                                    pauseOnHover
                                    theme="colored"
                                />
                            </div>
                        </Col>

                    )) :
                    (
                        getProdOnSearch &&
                        <Col style={{ paddingLeft: '25px' }}>
                            <div className="product-card">
                                <img className="product-image" src={getProdOnSearch.imagePath} />
                                <h3 className="product-name overflow-wrap">{getProdOnSearch.name}</h3>
                                <p className="product-price">${getProdOnSearch.price}</p>
                                <button className="add-to-cart" onClick={() => onAdd(getProdOnSearch)}>
                                    Add to Cart
                                </button>
                            </div>
                        </Col>
                    )

            }
        </Row>
    );
};

export default ProductCard;