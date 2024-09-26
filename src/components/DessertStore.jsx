import React, { useState } from "react";
import { data } from "../data";
import emptyCart from "../assets/images/illustration-empty-cart.svg";
import orderConfirmed from "../assets/images/icon-order-confirmed.svg";
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

  const resetOrder = () => {
    setCart([]);
    setIsModalOpen(false);
  };

  return (
    <div className="bg-Rose_1 min-h-screen py-16 px-8">
      <h1 className="font-bold text-4xl mb-12">Desserts</h1>
      <div className="grid md:grid-cols-4 gap-8 items-center md:items-start">
        <div className="md:col-span-3 grid md:grid-cols-3 gap-8">
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
            <>
              <div className="flex flex-col items-center justify-center">
                <img src={emptyCart} alt="" />
                <p className="text-center text-gray-500">
                  Your added items will appear here.
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end md:items-center justify-center">
          <div className="bg-white gap-6 p-6 rounded-t-lg md:rounded-lg shadow-lg flex flex-col items-center md:max-w-xl w-full">
            <div className="flex flex-col gap-2 items-start w-full">
              <img src={orderConfirmed} alt="" />
              <h2 className="text-2xl font-bold w-full text-start">
                Order Confirmed
              </h2>
              <span className="w-full text-start text-gray-400">
                We hope you enjoy your food!
              </span>
            </div>
            <div className="space-y-2 bg-Rose_2 rounded p-3 w-full">
              {cart.map((item) => (
                <div
                  key={item.name}
                  className="flex w-full items-center justify-between border-b border-Rose_3 p-2"
                >
                  <div className="flex items-center justify-center gap-3">
                    <img
                      src={item?.image?.desktop}
                      alt=""
                      className="w-12 md:w-16 rounded"
                    />
                    <div className="flex flex-col gap-1">
                      <span className="font-semibold">{item?.name}</span>
                      <div className="flex items-center gap-4">
                        <span className="text-orange-700 font-bold">
                          {item?.quantity}x
                        </span>
                        <span className="text-gray-400">@ ${item?.price}</span>
                      </div>
                    </div>
                  </div>
                  <span className="font-semibold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
              <div className="flex items-center justify-between">
                <span>Order Total:</span>
                <span>
                  $
                  {cart
                    .reduce(
                      (total, item) => total + item.price * item.quantity,
                      0
                    )
                    .toFixed(2)}
                </span>
              </div>
            </div>
            <button
              className="w-full cursor-pointer bg-Red text-white py-2 px-12 rounded-full"
              onClick={resetOrder}
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
