import React, { useState } from 'react';
import data from '../data.json'; // Assuming your data is stored in a separate JSON file

function DessertStore() {
  const [cart, setCart] = useState([]);

  // Add item to cart
  const addToCart = (item) => {
    const existingItem = cart.find((cartItem) => cartItem.name === item.name);
    if (existingItem) {
      setCart(
        cart.map((cartItem) =>
          cartItem.name === item.name
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  // Increase item quantity in cart
  const increaseQuantity = (name) => {
    setCart(
      cart.map((item) =>
        item.name === name ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Decrease item quantity in cart
  const decreaseQuantity = (name) => {
    const itemToDecrease = cart.find((item) => item.name === name);
    if (itemToDecrease.quantity === 1) {
      setCart(cart.filter((item) => item.name !== name));
    } else {
      setCart(
        cart.map((item) =>
          item.name === name ? { ...item, quantity: item.quantity - 1 } : item
        )
      );
    }
  };

  // Clear cart
  const clearCart = () => {
    setCart([]);
  };

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Handle checkout
  const handleCheckout = () => {
    setIsModalOpen(true);
  };

  return (
    <div>
      <h1>Dessert Shop</h1>
      <div className='grid grid-cols-4'>
      <div className="flex col-span-3 flex-wrap gap-8 items-center justify-center">
        {data.map((item, index) => (
          <div key={index} className="flex flex-col ">
            <img src={item.image.thumbnail} alt={item.name} />
            <h2>{item.name}</h2>
            <p>${item.price}</p>
            <button onClick={() => addToCart(item)}>Add to Cart</button>
          </div>
        ))}
      </div>
      <div className="cart">
        <h2>Cart</h2>
        {cart.length > 0 ? (
          <>
            {cart.map((item) => (
              <div key={item.name}>
                <span>{item.name}</span>
                <button onClick={() => decreaseQuantity(item.name)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => increaseQuantity(item.name)}>+</button>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div>
              <button onClick={clearCart}>Clear Cart</button>
              <button onClick={handleCheckout}>Checkout</button>
            </div>
          </>
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>
      </div>


      {isModalOpen && (
        <div className="modal">
          <h2>Order Summary</h2>
          <ul>
            {cart.map((item) => (
              <li key={item.name}>
                {item.quantity} x {item.name} - ${(item.price * item.quantity).toFixed(2)}
              </li>
            ))}
          </ul>
          <p>
            Total: $
            {cart
              .reduce((total, item) => total + item.price * item.quantity, 0)
              .toFixed(2)}
          </p>
          <button onClick={() => setIsModalOpen(false)}>Close</button>
        </div>
      )}
    </div>
  );
}

export default DessertStore;
