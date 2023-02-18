import React, { useRef, useEffect, useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";


export default function Paypal() {
    const [isPaid, setIsPaid] = useState(false)
    console.log(isPaid)
    return (
        <div>
            <PayPalScriptProvider options={{ "client-id": "ATL0mrOKFizHqntPMwulz0kVYQAAiF56g2GIEFUPWUBtAs4dixW9unliXkMOZyLojycOMFNqGJ3X_dIP" }}>
                <PayPalButtons
                    style={{
                        layout: "horizontal",
                        shape: "pill",
                        color: "gold",
                        height: 40,


                    }}
                    createOrder={(data, actions) => {
                        return actions.order.create({
                            purchase_units: [
                                {
                                    amount: {
                                        value: "2.00",
                                    },
                                },
                            ],
                        });
                    }}
                    onApprove={async (data, actions) => {
                        const order = await actions.order.capture();
                        console.log(order)
                        setIsPaid(true)
                    }}
                />
            </PayPalScriptProvider>
        </div>
    );
}