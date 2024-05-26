import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const [errorMessage, setErrorMessage] = useState(null); // Error messages for data validation
    const [cartItems, setCartItems] = useState([]); // To store the cart information
    const [cardInfo, setCardInfo] = useState({ // To store the card information
        cardName: '',
        cardNumber: '',
        expirationDate: '',
        cvv: ''
    });

    const navigate = useNavigate(); // Initialize navigate
    
    useEffect(() => { // Retrieve the cart from localStorage
        const cartData = localStorage.getItem('cart');
        if (cartData) {
            setCartItems(JSON.parse(cartData));
        }
    }, []);

    const calculateTotalPrice = () => { // Calculate the total price of items in the cart
        return cartItems.reduce((total, item) => total + item.price, 0) / 100;
    };

    const removeItem = (index) => { // Remove items from the cart
        const updatedCartItems = [...cartItems];
        updatedCartItems.splice(index, 1);
        setCartItems(updatedCartItems);
        localStorage.setItem('cart', JSON.stringify(updatedCartItems));
    };

    const handleCardInputChange = (event) => { // Handle input change in the card detail boxes
        const { name, value } = event.target;
        setCardInfo({
            ...cardInfo,
            [name]: value
        });
    };

    const handleOrderConfirmation = () => { // Data validation of order confirmation
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1; // Get current month
        const currentYear = currentDate.getFullYear() % 100; // Get last two digits of the year

        if (cardInfo.cardName.length < 1) {
            setErrorMessage("Confirmation failed: Invalid card details");
            return;
        }
        if (cardInfo.cardNumber.length !== 16) {
            setErrorMessage("Confirmation failed: Invalid card details");   // Feedback to user on data validation
            return;
        }
        if (cardInfo.cvv.length !== 3) {
            setErrorMessage("Confirmation failed: Invalid card details");
            return;
        }
        if (
            parseInt(cardInfo.expirationYear, 10) < currentYear ||
            (parseInt(cardInfo.expirationYear, 10) === currentYear &&
                parseInt(cardInfo.expirationMonth, 10) < currentMonth)  // Check if card is expired
        ) {
            setErrorMessage("Confirmation failed: Card is expired"); // Feedback on card expiry
            return;
        }
        navigate("/confirm"); // navigate user to confirmation page if details are correct
    };

    return (
        <div className="cart-container">
            <div className="cart">
                <h1>Your Cart</h1>
                {cartItems.length > 0 ? (
                    <table className="cart-table">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Description</th>
                                <th>Price</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map((item, index) => (
                                <tr key={index} className="cart-item">
                                    <td>
                                        <img src={item.image} alt={item.title} /> {/* table listing each item stored in the cart */}
                                    </td>
                                    <td>
                                        <h2>{item.title}</h2>
                                        <p>{item.description}</p>
                                    </td>
                                    <td>${item.price / 100}</td>
                                    <td>
                                        <button onClick={() => removeItem(index)}>Remove</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan="3" style={{ textAlign: 'right' }}>
                                    Total:
                                </td>
                                <td>${calculateTotalPrice()}</td> {/* Total price of the cart is displayed */}
                            </tr>
                        </tfoot>
                    </table>
                ) : (
                    <p>Your cart is empty.</p>
                )}
            </div>
            <div className="checkout-section"> {/* checkout section for user to enter card information */}
                <h2>Checkout</h2>
                <form>
                    <label>
                        Name On Card:
                        <input
                            type="text"
                            name="cardName"
                            value={cardInfo.cardName}
                            onChange={handleCardInputChange}
                        />
                    </label>
                    <label>
                        Card Number:
                        <input
                            type="text"
                            name="cardNumber"
                            placeholder="1234 5678 1234 5678"
                            value={cardInfo.cardNumber}
                            onChange={handleCardInputChange}
                        />
                    </label>
                    <label>
                        Expiration Date:
                        <div className="expiry-inputs">
                            <input
                                type="text"
                                name="expirationMonth"
                                placeholder="MM"
                                value={cardInfo.expirationMonth}
                                onChange={handleCardInputChange}
                                className="expiry-input"
                            />
                            <span className="separator">/</span>
                            <input
                                type="text"
                                name="expirationYear"
                                placeholder="YY"
                                value={cardInfo.expirationYear}
                                onChange={handleCardInputChange}
                                className="expiry-input"
                            />
                        </div>
                    </label>
                    <label>
                        CVV:
                        <input
                            type="text"
                            name="cvv"
                            placeholder="123"
                            value={cardInfo.cvv}
                            onChange={handleCardInputChange}
                        />
                    </label>
                    <button type="button" onClick={handleOrderConfirmation}>Confirm Order</button>
                    {errorMessage !== null && (
                        <div className="form-1">
                            <span className="text-danger">{errorMessage}</span>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default Cart;