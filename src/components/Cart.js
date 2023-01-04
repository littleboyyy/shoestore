import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardHeader,
    MDBCol,
    MDBContainer,
    MDBListGroup,
    MDBListGroupItem,
    MDBRipple,
    MDBRow,

    MDBTypography,
} from "mdb-react-ui-kit";
import React, { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';


import Form from 'react-bootstrap/Form';

import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import '../style/cart.css'


export default function Cart({ quantity, onRemove, cartItems, onAdd, onDecrease, }) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    var totalCost = 0

    cartItems.forEach(item => {
        totalCost = totalCost + (item.price * item.itemQuantity)
    })


    return (
        <>
            <Button
                onClick={handleShow}
                style={{ width: "3rem", height: "3rem", position: 'absolute', right: '16px' }}
                variant="outline-primary"
                className="rounded-circle "
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 576 512"
                    fill="currentColor"
                >
                    <path d="M96 0C107.5 0 117.4 8.19 119.6 19.51L121.1 32H541.8C562.1 32 578.3 52.25 572.6 72.66L518.6 264.7C514.7 278.5 502.1 288 487.8 288H170.7L179.9 336H488C501.3 336 512 346.7 512 360C512 373.3 501.3 384 488 384H159.1C148.5 384 138.6 375.8 136.4 364.5L76.14 48H24C10.75 48 0 37.25 0 24C0 10.75 10.75 0 24 0H96zM128 464C128 437.5 149.5 416 176 416C202.5 416 224 437.5 224 464C224 490.5 202.5 512 176 512C149.5 512 128 490.5 128 464zM512 464C512 490.5 490.5 512 464 512C437.5 512 416 490.5 416 464C416 437.5 437.5 416 464 416C490.5 416 512 437.5 512 464z" />
                </svg>
                <div
                    className="rounded-circle bg-danger d-flex justify-content-center align-items-center"
                    style={{
                        color: "white",
                        width: "1.5rem",
                        height: "1.5rem",
                        position: "absolute",
                        bottom: 0,
                        right: 0,
                        transform: "translate(25%, 25%)",
                    }}
                >
                    {quantity}
                </div>
            </Button>

            <Offcanvas show={show} onHide={handleClose} placement='end' className='gradient-custom' >
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title></Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>

                    <section className="h-100 " style={{ position: 'relative', right: '20px' }}>
                        <MDBContainer className="py-8 h-100">
                            <MDBRow className="justify-content-center my-0">
                                <MDBCol md="8">
                                    <MDBCard className="mb-4" style={{ width: '280px' }}>
                                        <MDBCardHeader className="py-3">
                                            {
                                                quantity > 0 ?
                                                    <MDBTypography tag="h5" className="mb-0">
                                                        Cart - {quantity} items
                                                    </MDBTypography>
                                                    :
                                                    <MDBTypography tag="h5" className="mb-0">
                                                        Cart is empty!
                                                    </MDBTypography>
                                            }
                                        </MDBCardHeader>
                                        {
                                            cartItems.length > 0 &&
                                            cartItems.map(item =>

                                                <MDBCardBody>
                                                    <MDBRow>
                                                        <MDBCol lg="3" md="12" className="mb-4 mb-lg-0">
                                                            <MDBRipple rippleTag="div" rippleColor="light"
                                                                className="bg-image rounded hover-zoom hover-overlay">
                                                                <img
                                                                    src={item.img}
                                                                    className="w-100" />
                                                                <a href="#!">
                                                                    <div className="mask" style={{ backgroundColor: "rgba(251, 251, 251, 0.2)", }}>
                                                                    </div>
                                                                </a>
                                                            </MDBRipple>
                                                        </MDBCol>

                                                        <MDBCol lg="5" md="6" className=" mb-4 mb-lg-0">
                                                            <p>
                                                                <strong>{item.name}</strong>
                                                            </p>
                                                            Color:
                                                            <p>{item.color}</p>
                                                            Size:
                                                            <p>{item.size}</p>
                                                            <br />

                                                            <Button variant="outline-danger" onClick={() => onRemove(item)}>
                                                                <FaTrash></FaTrash>
                                                            </Button>
                                                            <br /><br /> <br />


                                                            <Button variant="primary" onClick={() => onDecrease(item)}>
                                                                <FaMinus></FaMinus>
                                                            </Button>
                                                            <label htmlFor="" style={{ marginLeft: '1px', marginRight: '1px' }}>{item.itemQuantity}</label>
                                                            <Button variant="primary" onClick={() => onAdd(item)}>
                                                                <FaPlus></FaPlus>
                                                            </Button>

                                                            <br /><br />
                                                            <p className="text-start text-md-center">
                                                                <strong>${item.price}</strong>
                                                            </p>
                                                        </MDBCol>
                                                    </MDBRow>

                                                    <hr className="my-4" />

                                                </MDBCardBody>


                                            )
                                        }
                                    </MDBCard>

                                    {/* <MDBCard className="mb-4">
                                        <MDBCardBody>
                                            <p>
                                                <strong>Expected shipping delivery</strong>
                                            </p>
                                            <p className="mb-0">12.10.2020 - 14.10.2020</p>
                                        </MDBCardBody>
                                    </MDBCard> */}
                                </MDBCol>
                                {
                                    quantity > 0 &&
                                    <MDBCol md="5">
                                        <MDBCard className="mb-4" style={{
                                            width: '250px',
                                            position: 'relative',
                                            right: '25px'
                                        }}>
                                            <MDBCardHeader>
                                                <MDBTypography tag="h5" className="mb-0">
                                                    Summary
                                                </MDBTypography>
                                            </MDBCardHeader>
                                            <MDBCardBody>
                                                <MDBListGroup flush>
                                                    <MDBListGroupItem
                                                        className="d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                                                        Products
                                                        <span>{totalCost}</span>
                                                    </MDBListGroupItem>
                                                    <MDBListGroupItem className="d-flex justify-content-between align-items-center px-0">
                                                        Shipping
                                                        <span>Gratis</span>
                                                    </MDBListGroupItem>
                                                    <MDBListGroupItem
                                                        className="d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                                                        <div>
                                                            <strong>Total amount</strong>
                                                            <strong>
                                                                <p className="mb-0"></p>
                                                            </strong>
                                                        </div>
                                                        <span>
                                                            <strong>{totalCost}</strong>
                                                        </span>
                                                    </MDBListGroupItem>
                                                </MDBListGroup>

                                                <MDBBtn block>
                                                    Go to checkout
                                                </MDBBtn>
                                            </MDBCardBody>
                                        </MDBCard>
                                    </MDBCol>
                                }
                            </MDBRow>
                        </MDBContainer>
                    </section>

                    {/* <Container>
                        <div>
                            {cartItems.length === 0 && <div>Cart is empty,please add courses you want to register! </div>}
                            {cartItems.map(item => (
                                <div className="container">
                                    <br />
                                    <div className="row">
                                        <div className="col-xs-8">
                                            <div className="panel panel-info">
                                                <div className="panel-body">
                                                    <div class="row">
                                                        <div className="cart-items">
                                                            <br />
                                                            <div className="col-xs-4">
                                                                <h4 className="product-name"><strong>{item.name}</strong></h4>
                                                            </div>
                                                            <div className="col-xs-6">
                                                                <div className="col-xs-6 text-right">
                                                                    <h6><strong>{item.price}</strong></h6>
                                                                </div>
                                                                <div>

                                                                </div>
                                                                <h6><strong>{item.itemQuantity}</strong></h6>
                                                                <button onClick={() => onAdd(item)}
                                                                >
                                                                    tang
                                                                </button>
                                                                <button onClick={() => onDecrease(item)}>
                                                                    giam
                                                                </button>
                                                                <br /><br />
                                                                <div className="col-xs-4">
                                                                    <button type="button" className="btn btn-danger btn-act" onClick={() => onRemove(item)}>Remove</button>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {
                                totalCost > 0 &&
                                <div>
                                    Total Cost is :{totalCost}
                                </div>
                            }
                        </div>
                    </Container> */}
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}
