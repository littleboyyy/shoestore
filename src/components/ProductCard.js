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
            autoClose: 2000,
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
            {
                prodOnSearch === '' ?
                    products.map(item => (
                        <Col style={{ padding: '50px' }}>
                            <div className="product-card">
                                <h3 className="product-name">{item.name}</h3>
                                <img className="product-image" src={item.img} />
                                <p className="product-price">{item.price}</p>
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
                        getProdOnSearch ?
                            <Col style={{ paddingLeft: '25px' }}>
                                <div className="product-card">
                                    <h3 className="product-name">{getProdOnSearch.name}</h3>
                                    <img className="product-image" src={getProdOnSearch.img} />
                                    <p className="product-price">{getProdOnSearch.price}</p>
                                    <button className="add-to-cart" onClick={() => onAdd(getProdOnSearch)}>
                                        Add to Cart
                                    </button>
                                </div>
                            </Col>

                            :
                            <div>
                                <p>Item Not Found :(</p>
                            </div>

                    )

            }
        </Row>
    );
};

export default ProductCard;