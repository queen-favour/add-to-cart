import React, { useState } from "react";
import { data } from "../data";
import { MdOutlineAddShoppingCart, MdRemove, MdAdd } from "react-icons/md";

function DessertStore() {
  const [cart, setCart] = useState([]);

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

  const increaseQuantity = (name) => {
    setCart(
      cart.map((item) =>
        item.name === name ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

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

  const removeFromCart = (name) => {
    setCart(cart.filter((item) => item.name !== name));
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCheckout = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="bg-Rose_1 min-h-screen py-16 px-8">
      <h1 className="font-bold text-4xl mb-12">Desserts</h1>

      <div className="grid grid-cols-4 gap-8">
        <div className="col-span-3 grid grid-cols-3 gap-8">
          {data.map((item, index) => {
            const inCart = cart.find((cartItem) => cartItem.name === item.name);
            return (
              <div key={index} className="flex flex-col space-y-3">
                <div className="relative flex flex-col items-center">
                  <img
                    className="rounded-lg"
                    src={item.image.desktop}
                    alt={item.name}
                  />
                  {inCart ? (
                    <div className="flex items-center gap-2 mt-[-32px] bg-Red px-4 py-2 rounded-full">
                      <button
                        className="text-xl cursor-pointer bg-white text-Red rounded-full p-1"
                        onClick={() => decreaseQuantity(item.name)}
                      >
                        <MdRemove />
                      </button>
                      <span>{inCart.quantity}</span>
                      <button
                        className="text-xl cursor-pointer bg-white text-Red rounded-full p-1"
                        onClick={() => increaseQuantity(item.name)}
                      >
                        <MdAdd />
                      </button>
                    </div>
                  ) : (
                    <button
                      className=" cursor-pointer flex items-center gap-2 mt-[-32px] bg-white border border-Rose_3 shadow-lg px-4 py-2 rounded-full font-semibold hover:bg-Rose_3 transition"
                      onClick={() => addToCart(item)}
                    >
                      <MdOutlineAddShoppingCart className="text-2xl text-Red" />
                      Add to Cart
                    </button>
                  )}
                </div>
                <div className="flex flex-col items-center text-center">
                  <p className="text-sm text-Rose_5">{item.category}</p>
                  <h2 className="font-semibold text-lg">{item.name}</h2>
                  <p className="text-Red font-bold">${item.price}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 space-y-6 h-fit">
          <h2 className="text-Red font-bold text-2xl">
            Your Cart ({cart.length})
          </h2>
          {cart.length > 0 ? (
            <>
              {cart.map((item) => (
                <div
                  key={item.name}
                  className="flex justify-between items-center border-b border-gray-200 py-2"
                >
                  <span>{item.name}</span>
                  <div className="flex items-center space-x-4">
                    <button
                      className=" cursor-pointer bg-gray-200 px-2 py-1 rounded-full"
                      onClick={() => decreaseQuantity(item.name)}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      className=" cursor-pointer bg-gray-200 px-2 py-1 rounded-full"
                      onClick={() => increaseQuantity(item.name)}
                    >
                      +
                    </button>
                    <span className="font-semibold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                    <button
                      className="text-Red  cursor-pointer"
                      onClick={() => removeFromCart(item.name)}
                    >
                      &times;
                    </button>
                  </div>
                </div>
              ))}
              <div className="flex justify-between items-center font-semibold text-lg">
                <p>Order Total</p>
                <p>
                  $
                  {cart
                    .reduce(
                      (total, item) => total + item.price * item.quantity,
                      0
                    )
                    .toFixed(2)}
                </p>
              </div>
              <div className="text-sm text-Rose_4">
                <span className="font-bold">
                  This is a carbon-neutral delivery
                </span>
              </div>
              <button
                className="w-full bg-Red text-white py-2 rounded-full font-semibold cursor-pointer hover:bg-Rose_5 transition"
                onClick={handleCheckout}
              >
                Confirm Order
              </button>
            </>
          ) : (
            <p className="text-center text-gray-500">Your cart is empty.</p>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-12 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <ul className="space-y-2">
              {cart.map((item) => (
                <li key={item.name}>
                  {item.quantity} x {item.name} - $
                  {(item.price * item.quantity).toFixed(2)}
                </li>
              ))}
            </ul>
            <p className="mt-4 font-semibold">
              Total: $
              {cart
                .reduce((total, item) => total + item.price * item.quantity, 0)
                .toFixed(2)}
            </p>
            <button
              className=" cursor-pointer mt-4 bg-Red text-white py-2 px-12 rounded-full"
              onClick={() => setIsModalOpen(false)}
            >
              Start New Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DessertStore;
