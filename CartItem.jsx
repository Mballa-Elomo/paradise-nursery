import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

function CartItem({ onContinueShopping }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  // ===== Calculate Total Amount for All Items =====
  const calculateTotalAmount = () => {
    return cartItems
      .reduce((total, item) => {
        const cost = parseFloat(item.cost.replace('$', ''));
        return total + cost * item.quantity;
      }, 0)
      .toFixed(2);
  };

  // ===== Calculate Total Cost for a Single Item =====
  const calculateTotalCost = (item) => {
    const cost = parseFloat(item.cost.replace('$', ''));
    return (cost * item.quantity).toFixed(2);
  };

  // ===== Handle Increment =====
  const handleIncrement = (item) => {
    dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }));
  };

  // ===== Handle Decrement =====
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.id));
    }
  };

  // ===== Handle Remove =====
  const handleRemove = (item) => {
    dispatch(removeItem(item.id));
  };

  // ===== Handle Continue Shopping =====
  const handleContinueShopping = () => {
    onContinueShopping();
  };

  // ===== Handle Checkout =====
  const handleCheckout = () => {
    alert('Coming Soon! Checkout functionality will be available shortly.');
  };

  return (
    <div className="cart-container">
      {/* ===== Cart Header ===== */}
      <h1 className="cart-title">🛒 Your Shopping Cart</h1>

      {/* ===== Empty Cart Message ===== */}
      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <p>🌿 Your cart is empty. Go add some plants!</p>
          <button
            className="continue-shopping-btn"
            onClick={handleContinueShopping}
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div>
          {/* ===== Cart Items List ===== */}
          <div className="cart-items-list">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">

                {/* Plant Image */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="cart-item-image"
                />

                {/* Plant Details */}
                <div className="cart-item-details">
                  <h2 className="cart-item-name">{item.name}</h2>
                  <p className="cart-item-description">{item.description}</p>
                  <p className="cart-item-unit-cost">
                    Unit Price: <strong>{item.cost}</strong>
                  </p>
                  <p className="cart-item-total-cost">
                    Subtotal: <strong>${calculateTotalCost(item)}</strong>
                  </p>
                </div>

                {/* Quantity Controls */}
                <div className="cart-item-controls">
                  <button
                    className="quantity-btn"
                    onClick={() => handleDecrement(item)}
                  >
                    ➖
                  </button>
                  <span className="quantity-display">{item.quantity}</span>
                  <button
                    className="quantity-btn"
                    onClick={() => handleIncrement(item)}
                  >
                    ➕
                  </button>
                </div>

                {/* Remove Button */}
                <button
                  className="remove-btn"
                  onClick={() => handleRemove(item)}
                >
                  🗑️ Remove
                </button>

              </div>
            ))}
          </div>

          {/* ===== Cart Summary ===== */}
          <div className="cart-summary">
            <h2 className="cart-total">
              Total Amount: <span>${calculateTotalAmount()}</span>
            </h2>

            {/* ===== Action Buttons ===== */}
            <div className="cart-actions">
              <button
                className="continue-shopping-btn"
                onClick={handleContinueShopping}
              >
                🌿 Continue Shopping
              </button>
              <button
                className="checkout-btn"
                onClick={handleCheckout}
              >
                ✅ Checkout
              </button>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}

export default CartItem;
