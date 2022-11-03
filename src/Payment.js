import React, { useEffect, useState } from 'react';
import CheckoutProduct from './CheckoutProduct';
import './Payment.css';
import { useStateValue } from './StateProvider';
import { Link, useHistory } from "react-router-dom";
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import CurrencyFormat from 'react-currency-format';
import { getbasketTotal } from './Reducer';
import axios from './axios';
import { db } from "./firebase";

function Payment() {

    const [{ basket, user }, dispatch] = useStateValue();

    const history = useHistory();

    /* Hooks */
    
    const stripe = useStripe();
    const elements = useElements();

    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState("");
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState(true);

    useEffect(() => {
        // Generate the special stripe secret which allows us to charge a customer
        // Important

        const getClientSecret = async () => {
            const response = await axios ({
                method: 'post',
                // Stripe expects the total in a currencies subunits
                // url: `/payments/create?total=${getbasketTotal(basket) * 100}`    for USD
                url: `/payments/create?total=${getbasketTotal(basket) * 100}`    // For inr
            });
            setClientSecret(response.data.clientSecret);
        }

        getClientSecret();
    }, [basket])

    console.log('THE SECRET IS >>> ', clientSecret)
    // console.log('👨', user)

    const handleSubmit = async (event) => {

        // Stripe stuff

        event.preventDefault();
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({ paymentIntent }) => {
            // PaymentIntent = payment confirmation

            db
            .collection('users')
            .doc(user?.uid)
            .collection('orders')
            .doc(paymentIntent.id)
            .set({
                basket: basket,
                amount: paymentIntent.amount,
                created: paymentIntent.created
            })

            setSucceeded(true);
            setError(null);
            setProcessing(false);

            dispatch({
                type: 'EMPTY_BASKET'
            })

            history.replace('/orders')
        })
    }

    const handleChange = event => {

        // Listen all the changes in the cardElement
        // and display any errors in the customer types their card details
        // Very very important
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
    }

  return (
    <div className='payment'>
        <div className='payment_container'>

            <h1>
                Checkout (<Link className='text-link' to="/checkout">{basket?.length} Items</Link>)
            </h1>

            {/* Delivary Address */}

            <div className='payment_section'>
                <div className='payment_title'>
                    <h3>Delivary Address</h3>
                </div>
                <div className='payment_address'>
                    <p>{user?.email}</p>
                    <p>Hokage Tower</p>
                    <p>Village hidden in leafs</p>
                </div>
            </div>

            {/* Review Items */}

            <div className='payment_section'>
                <div className='payment_title'>
                    <h3>Review items and Delivary</h3>                   
                </div>
                <div className='payment_items'>
                    {basket.map(item => (
                        <CheckoutProduct
                            id = {item.id}
                            title = {item.title}
                            image = {item.image}
                            price = {item.price}
                            rating = {item.rating}
                        />
                    ))}
                </div>
            </div>

            {/* Payment Method */}

            <div className='payment_section'>
                <div className='payment_title'>
                    <h3>Payment Method</h3>
                </div> 

                <div className='payment_details'>

                    {/* Stripe functionality should be here */}

                    <form onSubmit={handleSubmit}>
                        <CardElement onChange={handleChange}/>
                        <div className='payment_priceContainer'>
                            <CurrencyFormat
                                renderText={(value) => (
                                    <h3 className='payment_order'>order Total: {value}</h3>
                                )}
                                decimalScale = {2}
                                value = {getbasketTotal(basket)}
                                displayType = {"text"}
                                thousandSeparator = {true}
                                prefix = {"₹"}
                            />
                            <button disabled={processing || disabled || succeeded}>
                                <span>{processing ? <p>processing</p> : "Buy Now"}</span>
                            </button>
                        </div>

                        {/* Errors */}
                        {error && <div>{error}</div>}

                    </form>
                </div>

            </div>

        </div>
    </div>
  )
}

export default Payment;