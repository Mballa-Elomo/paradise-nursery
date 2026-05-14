import { createSlice } from '@reduxjs/toolkit';

const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Each item: { id, name, image, description, cost, quantity }
  },
  reducers: {

    // ===== 1. Add Item to Cart =====
    addItem: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        // If item already exists, increase quantity
        existingItem.quantity += 1;
      } else {
        // Otherwise, add new item with quantity 1
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },

    // ===== 2. Remove Item from Cart =====
    removeItem: (state, action) => {
      state.items = state.items.filter(
        (item) => item.id !== action.payload
      );
    },

    // ===== 3. Update Quantity of Item in Cart =====
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      if (existingItem) {
        if (quantity <= 0) {
          // Remove item if quantity drops to 0 or below
          state.items = state.items.filter((item) => item.id !== id);
        } else {
          existingItem.quantity = quantity;
        }
      }
    },

  },
});

// Export the actions
export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

// Export the reducer
export default CartSlice.reducer;
