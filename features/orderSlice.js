import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../app/config";


const initialState = {
  isLoading: false,
  error: null,
  orders: [],
  page: 1,
  totalOrders: null

};

const slice = createSlice({
  name: "order",
  initialState,

  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // create new order
    addOrderSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
    },

    // get order 
    getOrderSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.orders = action.payload;
    },

    updateOrderSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
    },
  }
});


export default slice.reducer;

// function create order
export const createOder =
  ({ customer, address, phone, products, priceShiping, total, authorId, status }) => async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {

      const response = await axios.post(`${BASE_URL}/orders`, {
        customer, address, phone, products, priceShiping, total, authorId, status
      })

      dispatch(slice.actions.addOrderSuccess(response.data))

    } catch (error) {
      dispatch(slice.actions.hasError(error.message))
    }
  };

//function get list order
export const getOrders =
  ({ page, limit = 10 }) =>
    async (dispatch) => {
      dispatch(slice.actions.startLoading());
      try {
        const params = { page, limit };
        const response = await axios.get(`${BASE_URL}/orders`, {
          params,
        });

        dispatch(slice.actions.getOrderSuccess(response.data));
      } catch (error) {
        console.log(error)
        dispatch(slice.actions.hasError(error.message));

      }
    };



export const UpdateOrder =
  ({ id, status }) =>
    async (dispatch) => {
      dispatch(slice.actions.startLoading());
      try {

        const response = await apiService.put(`/orders/${id}`, { status });
        dispatch(slice.actions.updateOrderSuccess(response.data))
        toast.success("Update Status order success");
      } catch (error) {
        dispatch(slice.actions.hasError(error.message));
        toast.error(error.message);
      }
    };
