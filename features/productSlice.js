import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../app/config";
//import { cloudinaryUpload } from "../../untils/cloudinary";
//import { PRODUCT_PER_PAGE } from "../../app/config";
//import { toast } from "react-toastify";


const initialState = {
  isLoading: false,
  error: null,
  products: [],
  productById: {},
  currentPageProducts: [],
  currentPageProductsUser: [],
  singleProduct: null,
  totalProduct: 0,

};

const slice = createSlice({
  name: "product",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    //get list product
    getProductSuccess(state, action) {
      state.isLoading = false;
      state.error = null;

      const { products, count } = action.payload;
      state.products = products
      products.forEach((product) => {
        state.productById[product._id] = product;
        if (!state.currentPageProducts.includes(product._id))
          state.currentPageProducts.push(product._id);
      });

      state.totalProduct = count;
    },

    //get single product
    getSingleProductSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.singleProduct = action.payload;
    },

    resetProducts(state, action) {
      state.productById = {};
      state.currentPageProducts = [];
    },

    deleteProductSuccess(state, action) {
      state.isLoading = false;
      state.error = null;

      state.currentPageProductsUser.shift();

    },

    updataProductSuccess(state, action) {
      state.isLoading = false;
      state.error = null;

    },

    createProductSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const newProduct = action.payload;

      state.currentPageProductsUser.unshift(newProduct);
      state.currentPageProducts.unshift(newProduct._id);
    },
  }
});

export default slice.reducer;


// function create product
// export const createProduct =
//   ({ productName, foods, price, priceSale, unit, rating, image, describe }) =>
//     async (dispatch) => {
//       dispatch(slice.actions.startLoading());
//       try {

//         const imageUrl = await cloudinaryUpload(image);
//         const response = await apiService.post("/products", {
//           productName, foods, price, priceSale, unit, rating, describe,
//           image: imageUrl,
//         });
//         dispatch(slice.actions.createProductSuccess(response.data));
//         // toast.success("Create Product successfully");

//       } catch (error) {
//         dispatch(slice.actions.hasError(error.message));
//         // toast.error(error.message);
//       }
//     };

// get list products
export const getProducts =
  ({ page = 1, limit = 10, name }) =>
    async (dispatch) => {
      dispatch(slice.actions.startLoading());
      try {
        const params = { page, name, limit };
        if (name) params.name = name;

        const response = await axios.get(`${BASE_URL}/products`, params);
        if (page === 1) dispatch(slice.actions.resetProducts());
        dispatch(slice.actions.getProductSuccess(response.data));
        console.log(response)
      } catch (error) {
        dispatch(slice.actions.hasError(error.message));
        // toast.error(error.message);
      }
    };


// get single product
export const getProduct =
  (id) =>
    async (dispatch) => {
      dispatch(slice.actions.startLoading());
      try {

        const response = await axios.get(`${BASE_URL}/products/${id}`);
        dispatch(slice.actions.getSingleProductSuccess(response.data));

      } catch (error) {
        dispatch(slice.actions.hasError(error.message));
        // toast.error(error.message);
      }
    };


// export const EditProduct =
//   ({ id, productName, foods, price, priceSale, unit, image, describe, userId, page }) =>
//     async (dispatch) => {
//       dispatch(slice.actions.startLoading());
//       try {
//         const data = { productName, foods, price, priceSale, unit, image, describe }

//         if (image instanceof File) {
//           const imageUrl = await cloudinaryUpload(image);
//           data.image = imageUrl;
//         }

//         const response = await apiService.put(`/products/${id}`, data);
//         dispatch(slice.actions.updataProductSuccess(response.data))
//         toast.success("Edit product success");
//       } catch (error) {
//         dispatch(slice.actions.hasError(error.message));
//         toast.error(error.message);
//       }
//     };



// export const deleteProduct =
//   (id) =>
//     async (dispatch) => {
//       dispatch(slice.actions.startLoading());
//       try {
//         const response = await apiService.delete(`/products/${id}`);
//         dispatch(slice.actions.deleteProductSuccess(response.data));

//         toast.success("delete success");
//       } catch (error) {
//         dispatch(slice.actions.hasError(error.message));
//         toast.error(error.message);
//       }
//     };


export async function getServerSideProps() {
  const res = await fetch(`${BASE_URL}/products`)
  const items = await res.json()
  return {
    props: {items}, 
  }
}