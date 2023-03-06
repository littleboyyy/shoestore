import React, { useState } from 'react';
import '../../style/card.css';
import { Row, Col, } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import notFoundIMG from '../../static/img/not_found_img.png'
import ProductDetail from './ProductDetail';


const ProductCard = ({ products, onAdd, prodOnSearch, cartItems, setCartItems, onSetSize }) => {

    const getProdOnSearch = products.filter(x =>
        x.name.toLowerCase().includes(prodOnSearch.toLowerCase())
    )

    const limitAdding = (item) => {
        const exist = cartItems.find(x => x.name === item.name)
        if (exist.itemQuantity === parseInt(item.detail.find(x => x.size === exist.size).amount)) {
            setCartItems(cartItems.map(x => x.name === item.name ? {
                ...exist, itemQuantity: 1
            } : x))
        }
    }

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

    // console.log(showDetail)

    return (
        <Row>
            {
                prodOnSearch === '' ?
                    products.map(item => (
                        <Col style={{ padding: '50px' }} xs='3'>
                            <div className="product-card">
                                <img className="product-image" src={item.imagePath} />
                                <h3 className="product-name overflow-wrap"
                                >{item.name}
                                </h3>

                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <p className="product-price" style={{ textDecorationLine: 'line-through' }}>
                                        ${item.price}
                                    </p>
                                    <p className="product-price" style={{ color: 'red' }}>
                                        ${parseFloat(item.price - (item.price * item.sale / 100)).toFixed(2)}
                                    </p>
                                </div>

                                <button className="add-to-cart" onClick={() => {
                                    onAdd(item)
                                    notifyAdded()
                                    limitAdding(item)
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
                                <ProductDetail product={item} cartItems={cartItems} onSetSize={onSetSize}
                                    onAdd={onAdd} limitAdding={limitAdding}
                                />
                            </div>
                        </Col>

                    )) :
                    (
                        getProdOnSearch.length > 0 ?
                            getProdOnSearch.map(productsFound =>
                                <Col style={{ padding: '50px' }} xs='3'>
                                    <div className="product-card">
                                        <img className="product-image" src={productsFound.imagePath} />
                                        <h3 className="product-name overflow-wrap">{productsFound.name}</h3>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <p className="product-price" style={{ textDecorationLine: 'line-through' }}>
                                                ${productsFound.price}
                                            </p>
                                            <p className="product-price" style={{ color: 'red' }}>
                                                ${parseFloat(productsFound.price - (productsFound.price * productsFound.sale / 100)).toFixed(2)}
                                            </p>
                                        </div>
                                        <button className="add-to-cart" onClick={() => {
                                            onAdd(productsFound)
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
                                        <ProductDetail product={productsFound} cartItems={cartItems} onSetSize={onSetSize}
                                            onAdd={onAdd} limitAdding={limitAdding}
                                        />
                                    </div>
                                </Col>
                            )
                            :
                            <div className='not-found-img'>
                                <img src={notFoundIMG} alt="" />
                            </div>
                    )

            }
        </Row>
    );
};

export default ProductCard;