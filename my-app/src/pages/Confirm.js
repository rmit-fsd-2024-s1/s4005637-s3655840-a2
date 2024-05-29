import React, { useState, useEffect } from 'react';
import { getCart } from '../data/repository';

const imageMap = {
    "fishmax.jpg": require('../images/fishmaxImage.jpg'),
    "fishplus.jpg": require('../images/fishplusImage.jpg'),
    "fishemulsion.jpg": require('../images/fishemulsion.jpg'),
    "folup.jpg": require('../images/folupImage.jpg'),
    "fulvic.jpg": require('../images/fulvicImg.jpg'),
    "soil.jpg": require('../images/soilImg.jpg')
  };

const Confirm = () => {
    const [cartItems, setCartItems] = useState([]); // To store the cart information
    
    useEffect(() => { // Retrieve the cart from localStorage
        loadCart();
    }, []);

    const loadCart = async () => {
        const currentCart = await getCart();
        setCartItems(currentCart);
    }

    const calculateTotalPrice = () => { // Calculate the total price of items in the cart
        return cartItems.reduce((total, item) => total + item.price, 0) / 100;
    };

    return (
        <div className="cart-container"> {/* confirmation page once user has confirmed order */}
            <div className="cart">
                <h1>Congrats! Your order is confirmed</h1>
                {cartItems.length > 0 ? (
                    <table className="cart-table">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Description</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map((item, index) => (
                                <tr key={index} className="cart-item">
                                    <td>
                                        <img src={imageMap[item.image]} alt={item.title} />
                                    </td>
                                    <td>
                                        <h2>{item.title}</h2>
                                        <p>{item.description}</p>
                                    </td>
                                    <td>${item.price / 100}</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan="3" style={{ textAlign: 'right' }}>
                                    Total:
                                </td>
                                <td>${calculateTotalPrice()}</td> {/* calculate total price of order */}
                            </tr>
                        </tfoot>
                    </table>
                ) : (
                    <p>Your cart is empty.</p>
                )}
            </div>
        </div>
    );
};

export default Confirm;