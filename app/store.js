import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/productSlice";
import cartReducer from "../features/cartSlice";
import orderReducer from "../features/orderSlice";


const rootReducer = {
    product: productReducer,
    cart: cartReducer,
    order: orderReducer

};

const store = configureStore({
    reducer: rootReducer,
});

export default store;