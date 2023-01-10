import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../app/config";



const slice = createSlice({
  name: "cart",
  initialState: {
    isLoading: false,
    error: null,
    products: [],
    productId: null,
    quantity: 0,
    total: 0,
  },

  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    reset: (state) => {
      state.products = [];
      state.quantity = 0;
      state.total = 0;
    },

    // add product cart
    addShoppingCartSuccess: (state, action) => {
      const { carts, totalQuantity } = action.payload
      state.quantity = totalQuantity
    },
    // get list cart
    getCartSuccess: (state, action) => {

      const { carts, totalQuantity } = action.payload
      state.products = carts
      state.quantity = totalQuantity
    },

    //update quantity Cart Success
    updateCartSuccess: (state, action) => {
      state.quantity = totalQuantity
    },

    deleteCartSuccess: (state, action) => {
      state.isLoading = false;
      state.error = null;

      state.products.shift()
    }
  },
});

export const { addProduct, reset } = slice.actions;
export default slice.reducer;

// get list
export const getCarts =
  (author) =>
    async (dispatch) => {
      dispatch(slice.actions.startLoading());
      try {

        const response = await axios.get(`${BASE_URL}/carts`);

        dispatch(slice.actions.getCartSuccess(response.data))

      } catch (error) {
        dispatch(slice.actions.hasError(error.message));
        // toast.error(error.message);
      }
    };

// add shopping cart 
export const addShoppingCart =
  ({ productId, quantity, author }) => async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {

      const response = await axios.post(`${BASE_URL}/carts`, {
        productId, quantity, author
      })

      dispatch(slice.actions.addShoppingCartSuccess(response.data))

    } catch (error) {
      dispatch(slice.actions.hasError(error.message))
    }
  };

// update quantity cart
export const updateQuantityCart =
  (id, quantity) => async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {

      const response = await axios.put(`${BASE_URL}/carts/${id}`, {
        quantity
      })

      dispatch(slice.actions.updateCartSuccess(response.data))

    } catch (error) {
      dispatch(slice.actions.hasError(error.message))
    }
  };

// delete single cart
export const deleteCart =
  (id) => async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {

      const response = await axios.delete(`${BASE_URL}/carts/${id}`)
      dispatch(slice.actions.deleteCartSuccess(response.data))

    } catch (error) {
      dispatch(slice.actions.hasError(error.message))
    }
  };